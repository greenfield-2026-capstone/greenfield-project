import Link from "next/link";
import Image from "next/image";
import { Character, Place } from "@/types/place";

export function EndingVideoCard({
  place,
  character,
  result
}: {
  place: Place;
  character: Character;
  result: "good" | "bad";
}) {
  const video = place.endingVideo[result];

  return (
    <div className="ending-layout">
      <section className="card ending-main">
        <div className="bubble bubble-npc ending-message">
          <strong>{character.name}</strong>
          <p>여기까지의 선택을 바탕으로, 이 이야기를 마무리할 영상을 보내주겠습니다.</p>
        </div>
        <div className="ending-thumbnail">
          {video.videoUrl ? (
            <video
              className="w-full rounded-xl"
              controls
              autoPlay
              src={video.videoUrl}
            />
          ) : (
            <>
              <Image src={video.thumbnailUrl} alt={video.title} fill sizes="(max-width: 1080px) 100vw, 60vw" className="media-image" />
              <div className="play-badge">▶</div>
            </>
          )}
        </div>
        <div className="card-body">
          <h1>{video.title}</h1>
          <p>{video.description}</p>
        </div>
      </section>

      <aside className="card ending-side">
        <p className="eyebrow">{character.name}</p>
        <h2>{place.name}</h2>
        <ul>
          <li>{character.sourceTitle}</li>
          <li>{place.highlights[0]}</li>
          <li>{result === "good" ? "좋은 결말" : "다른 결말"}</li>
        </ul>
        <Link href={`/story/${place.id}/${character.id}`} className="ghost-button">
          스토리 화면으로 돌아가기
        </Link>
      </aside>
    </div>
  );
}
