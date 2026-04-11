const appShell = document.getElementById("appShell");
const leftPanelToggle = document.getElementById("leftPanelToggle");
const rightPanelToggle = document.getElementById("rightPanelToggle");
const brandHome = document.getElementById("brandHome");
const menuButtons = document.querySelectorAll("[data-screen]");
const screens = {
  main: document.getElementById("screen-main"),
  chat: document.getElementById("screen-chat"),
};

const placeData = {
  gyeongbokgung: {
    name: "경복궁",
    location: "서울 종로구 사직로 161",
    description:
      "조선의 법궁으로 왕실 중심 공간이었던 장소입니다. 궁궐 구조와 복원 과정을 함께 보며 조선과 근현대의 흐름을 한 번에 연결할 수 있습니다.",
    imageClass: "palace",
    people: ["세종대왕", "고종", "흥선대원군"],
  },
  suwon: {
    name: "수원화성",
    location: "경기 수원시 장안구 영화동",
    description:
      "정조의 정치적 비전이 담긴 성곽 도시입니다. 방어 시설과 도시 계획을 같이 볼 수 있어 역사 여행 코스로 활용하기 좋습니다.",
    imageClass: "fortress",
    people: ["정조", "채제공", "박제가"],
  },
  seodaemun: {
    name: "서대문형무소",
    location: "서울 서대문구 통일로 251",
    description:
      "일제강점기 독립운동의 흔적을 가장 직접적으로 마주할 수 있는 장소입니다. 인물 스토리와 함께 체험형 학습에 적합합니다.",
    imageClass: "museum",
    people: ["유관순", "안창호", "김구"],
  },
  gyeongju: {
    name: "동궁과 월지",
    location: "경북 경주시 원화로 102",
    description:
      "신라 왕경 문화의 아름다움을 상징하는 유적지입니다. 야간 경관과 함께 고대 문화 콘텐츠를 시각적으로 전달하기 좋습니다.",
    imageClass: "night",
    people: ["문무왕", "김유신", "선덕여왕"],
  },
  deoksugung: {
    name: "덕수궁",
    location: "서울 중구 세종대로 99",
    description:
      "대한제국과 근대 전환기의 흔적이 공존하는 궁궐입니다. 서양식 건물과 궁궐 공간이 함께 있어 근현대 주제와 잘 맞습니다.",
    imageClass: "city",
    people: ["고종", "순종", "명성황후"],
  },
};

const detailName = document.getElementById("detailName");
const detailLocation = document.getElementById("detailLocation");
const detailDescription = document.getElementById("detailDescription");
const detailImage = document.getElementById("detailImage");
const relatedList = document.getElementById("relatedList");
const placeCards = document.querySelectorAll(".best-card");

const selects = {
  region: {
    trigger: document.querySelector('[data-select="region"]'),
    menu: document.getElementById("regionMenu"),
    value: document.getElementById("regionValue"),
    hero: document.getElementById("regionHero"),
  },
  era: {
    trigger: document.querySelector('[data-select="era"]'),
    menu: document.getElementById("eraMenu"),
    value: document.getElementById("eraValue"),
    hero: document.getElementById("eraHero"),
  },
  "chat-era": {
    trigger: document.querySelector('[data-select="chat-era"]'),
    menu: document.getElementById("chatEraMenu"),
    value: document.getElementById("chatEraValue"),
    hero: document.getElementById("chatEraHero"),
  },
};

function showScreen(target) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("is-visible", key === target);
  });

  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === target);
  });
}

function closeAllMenus() {
  Object.values(selects).forEach(({ menu }) => menu?.classList.remove("is-open"));
}

function setLeftPanel(open) {
  appShell.classList.toggle("left-open", open);
  appShell.classList.toggle("left-closed", !open);
  leftPanelToggle.textContent = open ? "<" : ">";
}

function setRightPanel(open) {
  appShell.classList.toggle("right-open", open);
  appShell.classList.toggle("right-closed", !open);
  rightPanelToggle.textContent = open ? ">" : "<";
}

leftPanelToggle?.addEventListener("click", () => {
  setLeftPanel(appShell.classList.contains("left-closed"));
});

rightPanelToggle?.addEventListener("click", () => {
  setRightPanel(appShell.classList.contains("right-closed"));
});

brandHome?.addEventListener("click", () => {
  showScreen("main");
});

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.screen;
    if (!target) return;
    showScreen(target);
  });
});

Object.values(selects).forEach((config) => {
  config.trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !config.menu.classList.contains("is-open");
    closeAllMenus();
    config.menu.classList.toggle("is-open", willOpen);
  });

  config.menu?.querySelectorAll("button").forEach((option) => {
    option.addEventListener("click", () => {
      const englishValue = option.dataset.value || option.textContent.trim();
      config.value.textContent = englishValue;
      config.hero.textContent = englishValue.toUpperCase();
      config.menu.classList.remove("is-open");
    });
  });
});

document.addEventListener("click", closeAllMenus);

placeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const place = placeData[card.dataset.place];
    if (!place) return;

    placeCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");

    detailName.textContent = place.name;
    detailLocation.textContent = place.location;
    detailDescription.textContent = place.description;
    detailImage.className = `detail-image ${place.imageClass}`;

    relatedList.innerHTML = place.people
      .map(
        (person) => `
          <article>
            <span class="dot"></span>
            <div>
              <strong>${person}</strong>
              <button type="button">chat</button>
            </div>
          </article>
        `
      )
      .join("");

    setRightPanel(true);
  });
});

const carouselSteps = {
  places: 0,
  people: 0,
};

const tracks = {
  places: document.getElementById("placesTrack"),
  people: document.getElementById("peopleTrack"),
};

document.querySelectorAll("[data-carousel]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.carousel;
    const direction = Number(button.dataset.direction);
    const track = tracks[key];
    if (!track) return;

    const card = track.children[0];
    const gap = 16;
    const stepWidth = (card?.getBoundingClientRect().width || 180) + gap;
    const visibleWidth = track.parentElement.getBoundingClientRect().width;
    const maxIndex = Math.max(0, Math.ceil((track.scrollWidth - visibleWidth) / stepWidth));

    carouselSteps[key] = Math.min(maxIndex, Math.max(0, carouselSteps[key] + direction));
    track.style.transform = `translateX(-${carouselSteps[key] * stepWidth}px)`;
  });
});

showScreen("main");
setLeftPanel(false);
setRightPanel(false);
