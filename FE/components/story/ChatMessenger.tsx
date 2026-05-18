import { Character, Place } from "@/types/place";

export function ChatMessenger({ place, character }: { place: Place; character: Character }) {
  return (
    <section className="card messenger-main">
      <div className="messenger-header">
        <div>
          <strong>{character.name}</strong>
          <span>{place.name}</span>
        </div>
        <span className="status-chip">대화 가능</span>
      </div>

      <div className="messenger-thread">
        <div className="bubble bubble-npc">
          <strong>{character.name}</strong>
          <p>{character.openingLine}</p>
        </div>
        <div className="bubble bubble-user">
          <p>처음 오면 어디부터 보는 게 좋을까요?</p>
        </div>
        <div className="bubble bubble-npc">
          <strong>{character.name}</strong>
          <p>{place.highlights[0]}부터 보면 좋아요. {place.summary}</p>
        </div>
        <div className="bubble bubble-user">
          <p>그 장면을 알고 보면 분위기가 많이 달라지나요?</p>
        </div>
        <div className="bubble bubble-npc">
          <strong>{character.name}</strong>
          <p>{character.summary} 그냥 지나치지 말고, 장면 하나씩 천천히 보면 이곳이 훨씬 재미있어질 거예요.</p>
        </div>
      </div>

      <div className="choice-panel is-hidden" aria-hidden="true">
        <button type="button">사건의 배경 먼저 묻기</button>
        <button type="button">인물의 감정에 집중하기</button>
        <button type="button">장소의 상징성 살펴보기</button>
        <button type="button">다음 장면으로 넘어가기</button>
      </div>

      <div className="messenger-input">
        <input type="text" placeholder={`${character.name}에게 메시지를 입력하세요`} />
        <button type="button">전송</button>
      </div>
    </section>
  );
}
