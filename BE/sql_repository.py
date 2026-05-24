import json
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional


BASE_DIR = Path(__file__).resolve().parent
DB_DIR = BASE_DIR / "data"
DB_PATH = DB_DIR / "histour.db"
CURATED_JSON_PATH = BASE_DIR.parent / "FE" / "data" / "curated" / "places.json"


def load_seed_places() -> List[Dict[str, Any]]:
    return json.loads(CURATED_JSON_PATH.read_text(encoding="utf-8"))


def get_connection() -> sqlite3.Connection:
    DB_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    seed_places = load_seed_places()

    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS places (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                district TEXT NOT NULL,
                airport_codes TEXT NOT NULL,
                airport_label TEXT NOT NULL,
                rank_label TEXT NOT NULL,
                era TEXT NOT NULL,
                summary TEXT NOT NULL,
                story_intro TEXT NOT NULL,
                image_url TEXT NOT NULL,
                tags TEXT NOT NULL,
                source_title TEXT NOT NULL,
                source_url TEXT,
                highlights TEXT NOT NULL,
                foreigner_note TEXT NOT NULL,
                buzz_title TEXT NOT NULL,
                buzz_stat TEXT NOT NULL,
                recommendation_items TEXT NOT NULL,
                data_sources TEXT NOT NULL,
                ending_video TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS characters (
                id TEXT NOT NULL,
                place_id TEXT NOT NULL,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                summary TEXT NOT NULL,
                image_url TEXT NOT NULL,
                opening_line TEXT NOT NULL,
                source_title TEXT NOT NULL,
                focus_keywords TEXT NOT NULL,
                PRIMARY KEY (place_id, id),
                FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS experiences (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                place_id TEXT NOT NULL,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                address TEXT NOT NULL,
                distance TEXT,
                source TEXT,
                FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
            );
            """
        )

        conn.execute("DELETE FROM experiences")
        conn.execute("DELETE FROM characters")
        conn.execute("DELETE FROM places")

        for place in seed_places:
            conn.execute(
                """
                INSERT INTO places (
                    id, name, location, district, airport_codes, airport_label, rank_label,
                    era, summary, story_intro, image_url, tags, source_title, source_url,
                    highlights, foreigner_note, buzz_title, buzz_stat, recommendation_items,
                    data_sources, ending_video
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    place["id"],
                    place["name"],
                    place["location"],
                    place["district"],
                    json.dumps(place["airport_codes"], ensure_ascii=False),
                    place["airport_label"],
                    place["rank_label"],
                    place["era"],
                    place["summary"],
                    place["story_intro"],
                    place["image_url"],
                    json.dumps(place["tags"], ensure_ascii=False),
                    place["source_title"],
                    place.get("source_url"),
                    json.dumps(place["highlights"], ensure_ascii=False),
                    place["foreigner_note"],
                    place["buzz_title"],
                    place["buzz_stat"],
                    json.dumps(place["recommendation_items"], ensure_ascii=False),
                    json.dumps(place["data_sources"], ensure_ascii=False),
                    json.dumps(place["ending_video"], ensure_ascii=False),
                ),
            )

            for character in place["characters"]:
                conn.execute(
                    """
                    INSERT INTO characters (
                        id, place_id, name, role, summary, image_url, opening_line, source_title, focus_keywords
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        character["id"],
                        place["id"],
                        character["name"],
                        character["role"],
                        character["summary"],
                        character["image_url"],
                        character["opening_line"],
                        character["source_title"],
                        json.dumps(character["focus_keywords"], ensure_ascii=False),
                    ),
                )

            for experience in place["experiences"]:
                conn.execute(
                    """
                    INSERT INTO experiences (
                        place_id, title, category, description, address, distance, source
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        place["id"],
                        experience["title"],
                        experience["category"],
                        experience["description"],
                        experience["address"],
                        experience.get("distance"),
                        experience.get("source"),
                    ),
                )


def _parse_place(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "name": row["name"],
        "location": row["location"],
        "district": row["district"],
        "airportCodes": json.loads(row["airport_codes"]),
        "airportLabel": row["airport_label"],
        "rankLabel": row["rank_label"],
        "era": row["era"],
        "summary": row["summary"],
        "storyIntro": row["story_intro"],
        "imageUrl": row["image_url"],
        "tags": json.loads(row["tags"]),
        "sourceTitle": row["source_title"],
        "sourceUrl": row["source_url"],
        "highlights": json.loads(row["highlights"]),
        "foreignerNote": row["foreigner_note"],
        "buzzTitle": row["buzz_title"],
        "buzzStat": row["buzz_stat"],
        "recommendationItems": json.loads(row["recommendation_items"]),
        "dataSources": json.loads(row["data_sources"]),
        "endingVideo": json.loads(row["ending_video"]),
    }


def _get_characters(conn: sqlite3.Connection, place_id: str) -> List[Dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT id, name, role, summary, image_url, opening_line, source_title, focus_keywords
        FROM characters
        WHERE place_id = ?
        ORDER BY rowid ASC
        """,
        (place_id,),
    ).fetchall()

    return [
        {
            "id": row["id"],
            "name": row["name"],
            "role": row["role"],
            "summary": row["summary"],
            "imageUrl": row["image_url"],
            "openingLine": row["opening_line"],
            "sourceTitle": row["source_title"],
            "focusKeywords": json.loads(row["focus_keywords"]),
        }
        for row in rows
    ]


def _get_experiences(conn: sqlite3.Connection, place_id: str) -> List[Dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT title, category, description, address, distance, source
        FROM experiences
        WHERE place_id = ?
        ORDER BY id ASC
        """,
        (place_id,),
    ).fetchall()

    return [
        {
            "title": row["title"],
            "category": row["category"],
            "description": row["description"],
            "address": row["address"],
            "distance": row["distance"],
            "source": row["source"],
        }
        for row in rows
    ]


def list_places(airport: str = "all") -> List[Dict[str, Any]]:
    with get_connection() as conn:
        rows = conn.execute("SELECT rowid, * FROM places ORDER BY rowid ASC").fetchall()
        places: List[Dict[str, Any]] = []
        for row in rows:
            place = _parse_place(row)
            place["characters"] = _get_characters(conn, row["id"])
            place["experiences"] = _get_experiences(conn, row["id"])
            if airport == "all" or airport in place["airportCodes"]:
                places.append(place)
        return places


def get_place(place_id: str) -> Optional[Dict[str, Any]]:
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM places WHERE id = ?", (place_id,)).fetchone()
        if row is None:
            return None
        place = _parse_place(row)
        place["characters"] = _get_characters(conn, place_id)
        place["experiences"] = _get_experiences(conn, place_id)
        return place


def get_place_characters(place_id: str) -> List[Dict[str, Any]]:
    with get_connection() as conn:
        return _get_characters(conn, place_id)


def get_place_experiences(place_id: str) -> List[Dict[str, Any]]:
    with get_connection() as conn:
        return _get_experiences(conn, place_id)
