import { MenuForm, MenuNav, MenuHeader, MenuList } from "./components";
import Component from "./core/Component";
import { CATEGORY_STATE, INITIAL_CATEGORY } from "./utils/const";
import { $ } from "./utils/DOM";

interface Props {
  [key: string]: string;
}
export default class App extends Component<Props> {
  constructor(domNode: Element) {
    super(domNode);
  }
  init(): void {
    const menuList = localStorage.getItem("menu");
    this.state = {
      category: INITIAL_CATEGORY,
      menu: menuList !== null ? JSON.parse(menuList) : CATEGORY_STATE,
    };
    console.log("this.state", this.state);
  }

  template(): string {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4" data-component="menu-nav"></header>
        <main class="mt-10 d-flex justify-center">
          <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between" data-component="menu-header"></div>
            <form id="menu-form" data-component="menu-form"></form>
            <ul id="menu-list" class="mt-3 pl-0" data-component="menu-list"></ul>
          </div>
        </main>
      </div>
    </div>`;
  }

  componentDidMount(): void {
    const {
      category,
      menuItems,
      changeCategory,
      addMenu,
      updateMenu,
      deleteMenu,
      toggleSoldOut,
    } = this;

    const $menuForm = $('[data-component="menu-form"]');
    const $menuNav = $('[data-component="menu-nav"]');
    const $menuHeader = $('[data-component="menu-header"]');
    const $menuList = $('[data-component="menu-list"]');

    new MenuForm($menuForm, { category, addMenu: addMenu.bind(this) });
    new MenuNav($menuNav, {
      category,
      changeCategory: changeCategory.bind(this),
    });
    new MenuHeader($menuHeader, { category, menuItems });
    new MenuList($menuList, {
      menuItems,
      updateMenu: updateMenu.bind(this),
      deleteMenu: deleteMenu.bind(this),
      toggleSoldOut: toggleSoldOut.bind(this),
    });
  }
  get menu() {
    return Object.assign(this.state.menu);
  }

  get category() {
    return this.state.category as string;
  }

  get menuItems() {
    return this.state.menu[this.state.category];
  }

  addMenu(menuName: string) {
    if (!menuName.trim()) return;
    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: [
          ...this.menuItems,
          {
            menuName,
            soldOut: false,
            menuId: Date.now(),
          },
        ],
      },
    });
    $("#menu-name").focus();
  }

  setEvent(): void {}

  updateMenu(newMenuName: string, targetId: number) {
    const updatedMenuItems = this.menuItems.map((menuItem) =>
      menuItem.menuId === targetId
        ? { ...menuItem, menuName: newMenuName }
        : menuItem
    );

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: updatedMenuItems,
      },
    });
  }

  deleteMenu(targetId: number) {
    const deletedMenuItems = this.menuItems.filter(
      ({ menuId }) => menuId !== targetId
    );

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: deletedMenuItems,
      },
    });
  }

  toggleSoldOut(targetId: number) {
    const soldOutMenuItems = this.menuItems.map((menuItem) =>
      menuItem.menuId === targetId
        ? {
            ...menuItem,
            soldOut: !menuItem.soldOut,
          }
        : menuItem
    );

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: soldOutMenuItems,
      },
    });
  }

  changeCategory(newCategory: any): void {
    this.setState({
      ...this.state,
      category: newCategory,
    });
  }

  setState(newState: any) {
    this.state = newState;
    this.render();
    localStorage.setItem("menu", JSON.stringify(this.menu));
  }
}
