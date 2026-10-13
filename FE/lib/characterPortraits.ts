// Original PNG dimensions, visible top/height, and head center (transparent margins excluded).
const portraits: Record<string, readonly number[]> = {
  "/images/jeongjo/characters/angry.png": [967, 803, 8, 795, 487],
  "/images/jeongjo/characters/faint.png": [1385, 1136, 34, 1102, 602],
  "/images/jeongjo/characters/normal.png": [963, 803, 18, 785, 479],
  "/images/jeongjo/characters/shout.png": [965, 803, 3, 800, 486],
  "/images/jeongjo/characters/smile.png": [969, 803, 19, 784, 474],
  "/images/jeongjo/young/angry.png": [757, 1024, 19, 1005, 343],
  "/images/jeongjo/young/normal.png": [762, 1024, 19, 1005, 410],
  "/images/jeongjo/young/serious.png": [768, 1024, 3, 1021, 383],
  "/images/jeongyakyong/curious.png": [1448, 1086, 12, 1074, 598],
  "/images/jeongyakyong/difficult.png": [1448, 1086, 27, 1059, 658],
  "/images/jeongyakyong/fed_up.png": [1448, 1086, 83, 1003, 566],
  "/images/jeongyakyong/flustered.png": [1448, 1086, 0, 1086, 672],
  "/images/jeongyakyong/normal.png": [1448, 1086, 7, 1079, 694],
  "/images/sejong/characters/angry.png": [1402, 1122, 25, 1097, 751],
  "/images/sejong/characters/neutral.png": [1402, 1122, 108, 1014, 706],
  "/images/sejong/characters/smile.png": [1402, 1122, 64, 1058, 645],
  "/images/sejong/characters/suggest.png": [1402, 1122, 23, 1099, 748],
  "/images/sejong/characters/surprised.png": [1402, 1122, 78, 1044, 654],
  "/images/sejong/young/curious.png": [1402, 1122, 0, 1122, 731],
  "/images/sejong/young/flustered.png": [1402, 1122, 6, 1116, 688],
  "/images/sejong/young/hurry.png": [1402, 1122, 7, 1115, 844],
  "/images/sejong/young/pout.png": [1402, 1122, 30, 1092, 604],
  "/images/sejong/young/scolded.png": [1402, 1122, 38, 1084, 600],
  "/images/sejong/young/smile.png": [1402, 1122, 8, 1114, 616],
  "/images/taejong/angry.png": [1402, 1122, 9, 1113, 710],
  "/images/kimmun/nagging.png": [1402, 1122, 147, 975, 606],
  "/images/kimmun/neutral.png": [1402, 1122, 152, 970, 634],
  "/images/kimmun/smile.png": [1402, 1122, 103, 1019, 634],
  "/images/kimmun/surprised.png": [1402, 1122, 113, 1009, 591],
};

export function getCharacterPortraitStyle(image: string) {
  const portrait=portraits[image];
  if(!portrait) return undefined;
  const [width,height,top,visibleHeight,center]=portrait;
  return {width:`calc(var(--portrait-height) * ${width/visibleHeight})`,height:`calc(var(--portrait-height) * ${height/visibleHeight})`,left:`calc(50% - var(--portrait-height) * ${center/visibleHeight})`,top:`calc(var(--portrait-height) * ${-top/visibleHeight})`};
}
