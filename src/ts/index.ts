import { $, $$ } from "./utils/DOM";
import menuItemTemplate, { Item } from "./utils/MenuItem";
export default function App(this: any) {
  this.currentCategory = "espresso";
  this.menu = { [this.currentCategory]: [] };
  this.menuList = $("#menu-list") as HTMLElement;
  this.init = () => {
    render();
    initEventListener();
  };
  this.menuInput = $("#menu-name") as HTMLInputElement;
  this.menuForm = $("#menu-form") as HTMLFormElement;

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item: Item) => menuItemTemplate(item))
      .join("");
    this.menuList.innerHTML = template;
  };
  const addMenuName = () => {
    const newMenuName = this.menuInput.value.trim();
    this.menuInput.value = "";
    if (!newMenuName) return;
    const newMenuObj: Item = {
      name: newMenuName,
      id: Date.now(),
      soldOut: false,
    };
    this.menu[this.currentCategory].push(newMenuObj);
    render();
  };

  const initEventListener = () => {
    this.menuForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      addMenuName();
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new (App as any)();
  app.init();
});
