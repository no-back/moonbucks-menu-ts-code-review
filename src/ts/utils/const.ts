interface MenuState {
  readonly [key: string]: Menu[] | [];
}

interface CategoryName {
  readonly [key: string]: string;
}

export const MESSAGE: { readonly [key: string]: string } = {
  UPDATE: "메뉴명을 수정하세요.",
  DELETE: "정말 삭제하시겠습니까?",
  WARN_BLANK: "메뉴를 입력해주세요.",
  ALREADY_EXISTS: "이미 동일한 메뉴가 있습니다.",
};

export const INITIAL_CATEGORY = "espresso";

export const CATEGORY_STATE: MenuState = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  dessert: [],
};

export const CATEGORY_NAME: CategoryName = {
  espresso: "☕ 에스프레소",
  frappuccino: "🥤 프라푸치노",
  blended: "🍹 블렌디드",
  teavana: "🫖 티바나",
  dessert: "🍰 디저트",
};
