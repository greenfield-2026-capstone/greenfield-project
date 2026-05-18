const screens = {
  home: document.getElementById("screen-home"),
  place: document.getElementById("screen-place"),
  characters: document.getElementById("screen-characters"),
  story: document.getElementById("screen-story"),
  ending: document.getElementById("screen-ending"),
};

const placeGrid = document.getElementById("placeGrid");
const airportFilter = document.getElementById("airportFilter");
const filterSummary = document.getElementById("filterSummary");
const goHomeButton = document.getElementById("goHome");
const characterPreviewGrid = document.getElementById("characterPreviewGrid");
const characterSelectGrid = document.getElementById("characterSelectGrid");
const goCharacterSelectButton = document.getElementById("goCharacterSelect");
const goEndingPreviewButton = document.getElementById("goEndingPreview");

const placeTitle = document.getElementById("placeTitle");
const placeHeroName = document.getElementById("placeHeroName");
const placeHeroStory = document.getElementById("placeHeroStory");
const placeLocation = document.getElementById("placeLocation");
const placeTagline = document.getElementById("placeTagline");
const placePeopleCount = document.getElementById("placePeopleCount");
const placeHeroImage = document.getElementById("placeHeroImage");
const placeAirportChip = document.getElementById("placeAirportChip");
const characterScreenTitle = document.getElementById("characterScreenTitle");
const storyCharacterImage = document.getElementById("storyCharacterImage");
const storyCharacterName = document.getElementById("storyCharacterName");
const storyCharacterRole = document.getElementById("storyCharacterRole");
const storyNpcName = document.getElementById("storyNpcName");
const storyNpcLine = document.getElementById("storyNpcLine");
const endingTitle = document.getElementById("endingTitle");

const places = [
  {
    id: "gyeongbokgung",
    name: "경복궁",
    location: "서울 종로구",
    airport: "ICN",
    airportLabel: "인천공항 기준",
    rank: "인기 1위",
    tagline: "조선 왕실의 중심 공간",
    shortStory: "세종, 고종 등 왕실 인물의 이야기가 겹겹이 쌓인 대표 궁궐",
    longStory:
      "경복궁은 조선의 정치와 문화가 집중된 공간입니다. 사용자는 궁궐이라는 실제 장소를 배경으로 왕실 인물과 대화하고, 선택에 따라 조선의 사건과 감정을 체험하는 흐름으로 들어가게 됩니다.",
    imageClass: "place-gyeongbokgung",
    characters: [
      {
        id: "sejong",
        name: "세종대왕",
        role: "훈민정음과 궁궐 이야기",
        description: "조선의 문화와 백성을 향한 고민을 중심으로 스토리를 이끌 인물",
        imageClass: "char-sejong",
        openingLine: "궁궐의 안과 밖, 어느 쪽부터 함께 살펴보겠는가?",
      },
      {
        id: "gojong",
        name: "고종",
        role: "대한제국과 전환기의 시선",
        description: "왕조의 끝자락에서 궁궐을 바라보는 시선으로 이야기를 들려주는 인물",
        imageClass: "char-gojong",
        openingLine: "변화의 문 앞에 서 있는 이 궁궐을 어떻게 보겠는가?",
      },
      {
        id: "heungseon",
        name: "흥선대원군",
        role: "경복궁 중건과 권력의 이야기",
        description: "궁궐을 다시 세운 의도와 긴장을 다루는 인물",
        imageClass: "char-heungseon",
        openingLine: "이 공간을 다시 세운 이유를 듣고 싶은가?",
      },
    ],
  },
  {
    id: "suwon",
    name: "수원화성",
    location: "경기 수원시",
    airport: "GMP",
    airportLabel: "김포공항 기준",
    rank: "인기 2위",
    tagline: "정조의 도시 실험",
    shortStory: "정조와 개혁의 비전을 따라 걸어보는 성곽 도시",
    longStory:
      "수원화성은 정조의 정치적 구상과 도시 계획이 녹아든 장소입니다. 플레이어는 정조 주변 인물들과 대화하며 왜 이 도시가 특별했는지 스토리형으로 따라가게 됩니다.",
    imageClass: "place-suwon",
    characters: [
      {
        id: "jeongjo",
        name: "정조",
        role: "개혁 군주의 선택",
        description: "도시와 백성을 향한 비전을 직접 들려주는 중심 인물",
        imageClass: "char-jeongjo",
        openingLine: "새로운 도시를 세운 이유를 어디서부터 듣고 싶은가?",
      },
      {
        id: "chaejegong",
        name: "채제공",
        role: "정책과 보좌의 시선",
        description: "정조의 곁에서 개혁을 현실로 만든 인물",
        imageClass: "char-chaejegong",
        openingLine: "이 계획이 실제로 가능했는지 함께 따져보겠는가?",
      },
      {
        id: "parkjega",
        name: "박제가",
        role: "실학과 새로운 사고",
        description: "조선 후기의 새로운 생각과 연결되는 인물",
        imageClass: "char-parkjega",
        openingLine: "도시의 변화가 왜 중요했는지 이야기해보자.",
      },
    ],
  },
  {
    id: "deoksugung",
    name: "덕수궁",
    location: "서울 중구",
    airport: "ICN",
    airportLabel: "인천공항 기준",
    rank: "인기 3위",
    tagline: "왕조의 끝과 근대의 시작",
    shortStory: "궁궐 안에서 조선 후기의 긴장과 변화를 마주하는 장소",
    longStory:
      "덕수궁은 궁궐이면서 동시에 근대 전환기를 품은 상징적 공간입니다. 조선의 마지막 풍경을 중심으로 인물 서사를 풀기에 적합한 장소입니다.",
    imageClass: "place-deoksugung",
    characters: [
      {
        id: "gojong",
        name: "고종",
        role: "황제의 시선",
        description: "조선의 마지막 국면과 대한제국의 선택을 들려주는 인물",
        imageClass: "char-gojong",
        openingLine: "이 궁궐에서 내가 보았던 변화를 들어보겠는가?",
      },
      {
        id: "myeongseong",
        name: "명성황후",
        role: "궁중 권력과 외교의 흐름",
        description: "조선 말 격변기를 다른 시선으로 풀어주는 인물",
        imageClass: "char-myeongseong",
        openingLine: "궁 안에서 벌어진 힘의 흐름을 알고 싶은가?",
      },
      {
        id: "sunjong",
        name: "순종",
        role: "마지막 조선의 감정",
        description: "시대의 끝에서 궁궐을 바라본 인물",
        imageClass: "char-sunjong",
        openingLine: "마지막 장면의 분위기를 함께 느껴보겠는가?",
      },
    ],
  },
];

let currentPlace = places[0];
let currentCharacter = places[0].characters[0];

function showScreen(target) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("is-visible", key === target);
  });
}

function renderPlaces() {
  const selectedAirport = airportFilter.value;
  const filtered =
    selectedAirport === "all" ? places : places.filter((place) => place.airport === selectedAirport);

  filterSummary.textContent =
    selectedAirport === "all"
      ? "현재 기준: 인기 관광지"
      : `현재 기준: ${
          airportFilter.options[airportFilter.selectedIndex].text
        }에서 접근하기 좋은 관광지`;

  placeGrid.innerHTML = filtered
    .map(
      (place) => `
        <article class="place-card">
          <div class="place-image ${place.imageClass}"></div>
          <div class="place-body">
            <div class="place-top">
              <h3>${place.name}</h3>
              <span class="rank-badge">${place.rank}</span>
            </div>
            <div class="place-meta">
              <span class="airport-badge">${place.airportLabel}</span>
              <span class="meta-chip">관련 인물 ${place.characters.length}명</span>
            </div>
            <p class="place-story">${place.shortStory}</p>
            <button class="primary-button" type="button" data-place-id="${place.id}">스토리 보기</button>
          </div>
        </article>
      `
    )
    .join("");

  placeGrid.querySelectorAll("[data-place-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextPlace = places.find((place) => place.id === button.dataset.placeId);
      if (!nextPlace) return;
      currentPlace = nextPlace;
      currentCharacter = nextPlace.characters[0];
      renderPlaceDetail();
      showScreen("place");
    });
  });
}

function renderPlaceDetail() {
  placeTitle.textContent = `${currentPlace.name} 상세`;
  placeHeroName.textContent = currentPlace.name;
  placeHeroStory.textContent = currentPlace.longStory;
  placeLocation.textContent = currentPlace.location;
  placeTagline.textContent = currentPlace.tagline;
  placePeopleCount.textContent = `${currentPlace.characters.length}명`;
  placeAirportChip.textContent = currentPlace.airportLabel;
  placeHeroImage.className = `place-hero-image ${currentPlace.imageClass}`;
  characterScreenTitle.textContent = `${currentPlace.name} 관련 인물 선택`;

  characterPreviewGrid.innerHTML = currentPlace.characters
    .map(
      (character) => `
        <article>
          <div class="character-preview-image ${character.imageClass}"></div>
          <h3>${character.name}</h3>
          <p class="character-role">${character.role}</p>
        </article>
      `
    )
    .join("");

  characterSelectGrid.innerHTML = currentPlace.characters
    .map(
      (character) => `
        <article class="character-select-card">
          <div class="character-select-image ${character.imageClass}"></div>
          <h3>${character.name}</h3>
          <p class="character-role">${character.role}</p>
          <p>${character.description}</p>
          <button class="primary-button" type="button" data-character-id="${character.id}">이 인물 선택</button>
        </article>
      `
    )
    .join("");

  characterSelectGrid.querySelectorAll("[data-character-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = currentPlace.characters.find((character) => character.id === button.dataset.characterId);
      if (!selected) return;
      currentCharacter = selected;
      renderStoryScreen();
      showScreen("story");
    });
  });
}

function renderStoryScreen() {
  storyCharacterImage.className = `story-character-image ${currentCharacter.imageClass}`;
  storyCharacterName.textContent = currentCharacter.name;
  storyCharacterRole.textContent = currentCharacter.role;
  storyNpcName.textContent = currentCharacter.name;
  storyNpcLine.textContent = currentCharacter.openingLine;
  endingTitle.textContent = `${currentPlace.name} 결말 영상`;
}

airportFilter.addEventListener("change", renderPlaces);

goHomeButton.addEventListener("click", () => showScreen("home"));
goCharacterSelectButton.addEventListener("click", () => showScreen("characters"));
goEndingPreviewButton.addEventListener("click", () => showScreen("ending"));

document.querySelectorAll("[data-nav]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.nav;
    if (target) showScreen(target);
  });
});

renderPlaces();
renderPlaceDetail();
renderStoryScreen();
showScreen("home");
