import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/place";

interface CharacterCardProps {
  placeId: string;
  character: Character;
  lang?: string;
}

const texts = {
  ko: {
    chat: "이 인물과 대화하기",
  },
  en: {
    chat: "Chat with this Character",
  },
};

const characterEn: Record<string, any> = {
  taejo: {
    name: "King Taejo",
    role: "The Beginning of the Capital and Dynasty",
    sourceTitle: "Sajikdan, a Pillar That Supported Joseon",
    summary:
      "A key figure who can explain why Gyeongbokgung Palace was important at the beginning of Joseon.",
    focusKeywords: ["Founding", "Dynasty", "Capital"],
  },
  taejong: {
    name: "King Taejong",
    role: "Gyeonghoeru and Palace Order",
    sourceTitle:
      "Gyeonghoeru Pavilion, a Small Universe Where Humans and Heaven Meet",
    summary:
      "A figure who can explain how royal spaces were organized through Gyeonghoeru and the palace layout.",
    focusKeywords: ["Gyeonghoeru", "Order", "Palace"],
  },
  heungseon: {
    name: "Heungseon Daewongun",
    role: "Reconstruction and Royal Authority",
    sourceTitle:
      "Haetae Statue, a Guardian Beast That Prevents Fire and Protects Justice",
    summary:
      "A figure who best explains the symbolism and authority of the rebuilt Gyeongbokgung Palace.",
    focusKeywords: ["Reconstruction", "Authority", "Gwanghwamun"],
  },
};

export function CharacterCard({
  placeId,
  character,
  lang = "ko",
}: CharacterCardProps) {
  const t = lang === "en" ? texts.en : texts.ko;
  const en = characterEn[character.id];
  const display = lang === "en" && en ? en : character;

  return (
    <article className="card character-card">
      <div className="character-image">
        <Image
          src={character.imageUrl}
          alt={display.name}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className="media-image"
          style={
            character.imagePosition
              ? { objectPosition: character.imagePosition }
              : undefined
          }
        />
      </div>

      <div className="card-body">
        <h3>{display.name}</h3>

        <p className="character-role">{display.role}</p>

        <p className="source-title">{display.sourceTitle}</p>

        <p>{display.summary}</p>

        <div className="badge-row compact-badges">
          {display.focusKeywords.map((keyword: string) => (
            <span key={keyword} className="badge badge-keyword">
              {keyword}
            </span>
          ))}
        </div>

        <Link
          href={`/story/${placeId}/${character.id}?lang=${lang}`}
          prefetch
          className="button-primary"
        >
          {t.chat}
        </Link>
      </div>
    </article>
  );
}