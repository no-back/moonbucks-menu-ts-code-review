class Store {
  setLocalStorage = (category: string, menuItems: []) => {
    return localStorage.setItem(category, JSON.stringify(menuItems));
  };
  getLocalStorage = (category: string) => {
    return JSON.parse(localStorage.getItem(category)!);
  };
}

export default new Store();
