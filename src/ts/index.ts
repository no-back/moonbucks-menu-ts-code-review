import { $, $$ } from "./utils/DOM";
import menuItemTemplate from "./utils/MenuItem";

interface Menu {
  id: Number;
  soldOut: Boolean;
  name: String;
}
export default function App(this: any) {
  this.currentCategory = "espresso";
  this.menu = { [this.currentCategory]: [] };
  this.init = () => {
    initEventListener();
  };
  this.menuInput = $("#menu-name") as HTMLInputElement;
  this.menuForm = $("#menu-form") as HTMLFormElement;

  const addMenuName = () => {
    const newMenuName = this.menuInput.value.trim();
    this.menuInput.value = "";
    if (!newMenuName) return;
    const newMenuObj: Menu = {
      name: newMenuName,
      id: Date.now(),
      soldOut: false,
    };
    this.menu[this.currentCategory].push(newMenuObj);
    console.log(this.menu);
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
