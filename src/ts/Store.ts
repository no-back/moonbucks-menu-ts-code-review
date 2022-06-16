type categoryIndex =
  | "espresso"
  | "frappuccino"
  | "blended"
  | "teavana"
  | "dessert";

interface menuItemInfo {
  category: string;
  menuName: string;
  status: string;
}

type menuItems = {
  [k in categoryIndex]?: menuItemInfo;
};

class Store {
  setLocalStorage = (category: string, menuItems: menuItems) => {
    return localStorage.setItem(category, JSON.stringify(menuItems));
  };
  getLocalStorage = (category: string) => {
    return JSON.parse(localStorage.getItem(category)!);
  };
}

export const store = new Store();
