interface MenuItemInfo {
  menuName: string;
  category: string;
  status: string;
}

type categoryIndex =
  | "espresso"
  | "frappuccino"
  | "blended"
  | "teavana"
  | "dessert";

type menuItems = {
  [k in categoryIndex]: object[];
};
