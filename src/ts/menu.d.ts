interface MenuItemInfo {
  menuName: string;
  category: string;
  status: string;
}

// type categoryIndex =
//   | "espresso"
//   | "frappuccino"
//   | "blended"
//   | "teavana"
//   | "dessert";

const arr: MenuItemInfo[] = [];
type menuItems = {
  [x in string]: arr;
};
