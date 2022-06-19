interface menu {
  menuName: string;
  soldOut: boolean;
  menuId: number;
}

interface MenuState {
  [key: string]: menu[];
}

export const MESSAGE = Object.freeze({
  EDIT: "메뉴명을 수정하세요.",
  DELETE: "정말 삭제하시겠습니까?",
  WARN_BLANK: "메뉴를 입력해주세요.",
  ALREADY_EXISTS: "이미 동일한 메뉴가 있습니다.",
});

export const CATEGORY_STATE: MenuState = Object.freeze({
  espresso: [],
  frappucino: [],
  blended: [],
  teavana: [],
  dessert: [],
});

export const CATEGORY_NAME = Object.freeze({
  espresso: "☕ 에스프레소",
  frappuccino: "🥤 프라푸치노",
  blended: "🍹 블렌디드",
  teavana: "🫖 티바나",
  dessert: "🍰 디저트",
});
