import { $ } from "./utils/DOM";
import { MESSAGE } from "./utils/const";
import menuItemTemplate, { Item } from "./utils/MenuItem";
export default function App(this: any) {
  this.currentCategory = "espresso";
  this.menu = { [this.currentCategory]: [] };
  this.menuList = $("#menu-list") as HTMLElement;
  this.init = () => {
    render();
    initEventListener();
    this.menuInput.focus();
  };
  this.menuInput = $("#menu-name") as HTMLInputElement;
  this.menuForm = $("#menu-form") as HTMLFormElement;
  this.menuCount = $(".menu-count") as HTMLParagraphElement;

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item: Item) => menuItemTemplate(item))
      .join("");
    this.menuList.innerHTML = template;
    getMenuCount();
  };

  const getMenuCount = () => {
    const count = this.menu[this.currentCategory].length;
    this.menuCount.textContent = `총 ${count} 개`;
  };
  const addMenuName = () => {
    const newMenuName = this.menuInput.value.trim();
    this.menuInput.value = "";
    this.menuInput.focus();
    if (!newMenuName) return;
    const newMenuObj: Item = {
      name: newMenuName,
      id: Date.now(),
      soldOut: false,
    };
    this.menu[this.currentCategory].push(newMenuObj);
    render();
  };

  const editMenuName = ($li: Element) => {
    const $menuName = $li.querySelector(".menu-name");
    const menu = $menuName?.textContent;
    let editedMenuName = prompt(MESSAGE.EDIT_MENU, menu ? menu : undefined);
    editMenuName;
  };

  const initEventListener = () => {
    this.menuForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      addMenuName();
    });
    this.editMenuName();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new (App as any)();
  app.init();
});
