import { DOM } from "./dom";
import store from "./Store";

export class App {
  currentCategory: string;
  menuItems: menuItems;

  constructor() {
    this.currentCategory = DOM.$categoryName.dataset.categoryName!;
    this.menuItems = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      dessert: [],
    };
    this.menuItems[this.currentCategory] = store.getLocalStorage(
      this.currentCategory
    );

    if (!this.menuItems[this.currentCategory])
      this.menuItems[this.currentCategory] = [];

    this.initEventHandlers();
    this.render();
  }

  setState = (newMenuItems: []) => {
    if (this.menuItems[this.currentCategory] !== newMenuItems) {
      this.menuItems[this.currentCategory] = newMenuItems;
    }
    this.render();
  };

  render = () => {
    if (this.menuItems[this.currentCategory]) {
      DOM.$menuList.innerHTML = this.menuItems[this.currentCategory]
        .map((item: { status: string; menuName: string }, index: number) => {
          return `<li data-id="${index}" class=" menu-list-item  d-flex items-center py-2">
      <span class="${item.status} w-100 pl-2 menu-name">${item.menuName}</span>
      <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
      수정
      </button>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
      삭제
      </button>
  </li>`;
        })
        .join("");
      this.updateMenuCount();
      DOM.$menuNameInput.value = "";
      DOM.$menuNameInput.focus();
    }
  };

  // Functions
  addMenuItem = () => {
    if (this.isDuplicatedMenuName(DOM.$menuNameInput.value)) {
      alert("이미 동일한 메뉴명이 있습니다.");
      DOM.$menuNameInput.value = "";
      DOM.$menuNameInput.focus();
      return;
    }
    if (DOM.$menuNameInput.value.trim() === "") {
      alert("공백 값을 입력하셨습니다.");
      DOM.$menuNameInput.value = "";
      DOM.$menuNameInput.focus();
      return;
    }
    const menuItemInfo: MenuItemInfo = {
      menuName: DOM.$menuNameInput.value,
      category: this.currentCategory,
      status: "normal", // || sold-out
    };
    let menuItems = this.menuItems[this.currentCategory];
    menuItems.push(menuItemInfo);
    this.setState(this.menuItems[this.currentCategory]);
    store.setLocalStorage(this.currentCategory, menuItems);
  };

  modifyMenuItem = (e: Event) => {
    const target = e.target as Element;
    const $listItem = target.closest("li");
    const $menuName = $listItem?.querySelector(".menu-name");
    const promptText = $menuName?.textContent;
    const newMenuName = prompt(
      "수정할 메뉴명을 적어주세요.",
      promptText ? promptText : undefined
    );
    if (!newMenuName) return;
    if (this.isDuplicatedMenuName(newMenuName)) {
      alert("이미 동일한 메뉴명이 있습니다.");
    } else if (newMenuName === $menuName?.textContent) {
      alert("기존과 동일한 메뉴명입니다.");
    } else if (newMenuName === "") {
      alert("값을 입력해주세요.");
    } else if (newMenuName !== null) {
      let listItemId = Number($listItem?.dataset.id);
      if (!listItemId) return;
      let menuItem: MenuItemInfo = this.menuItems[this.currentCategory][
        listItemId
      ];
      menuItem.menuName = newMenuName;
      this.setState(this.menuItems[this.currentCategory]);
      store.setLocalStorage(
        this.currentCategory,
        this.menuItems[this.currentCategory]
      );
    }
  };

  removeMenuItem = (e: Event) => {
    const target = e.target as Element;
    const $listItem = target.closest("li");
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      this.menuItems[this.currentCategory].splice(
        Number($listItem?.dataset.id),
        1
      );
      this.setState(this.menuItems[this.currentCategory]);
      store.setLocalStorage(
        this.currentCategory,
        this.menuItems[this.currentCategory]
      );
    }
  };

  updateMenuCount = () => {
    const menuCount = DOM.$menuList.querySelectorAll("li").length;
    DOM.$counter.textContent = `총 ${menuCount} 개`;
  };

  isContainedClass = (className: string, e: Event): boolean => {
    const target = e.target as Element;
    if (target.classList.contains(className)) return true;
    else return false;
  };

  isDuplicatedMenuName = (newMenuName: string): boolean => {
    const duplicatedMenuItem = this.menuItems[this.currentCategory].find(
      (item: { menuName: string }) => {
        if (item.menuName == newMenuName) return true;
        else return false;
      }
    );
    if (duplicatedMenuItem) return true;
    return false;
  };

  initEventHandlers = () => {
    DOM.$menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    DOM.$menuNameInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && DOM.$menuNameInput.value !== "")
        this.addMenuItem();
    });

    DOM.$submitButton.addEventListener("click", () => {
      if (DOM.$menuNameInput.value === "") alert("값을 입력해주세요.");
      else this.addMenuItem();
    });

    DOM.$menuList.addEventListener("click", (e) => {
      if (this.isContainedClass("menu-edit-button", e)) this.modifyMenuItem(e);
      else if (this.isContainedClass("menu-remove-button", e))
        this.removeMenuItem(e);
      else if (this.isContainedClass("menu-sold-out-button", e)) {
        const target = e.target as Element;
        const $listItem = target.closest("li");
        const listItemId = Number($listItem?.dataset.id);
        if (listItemId === undefined) return;
        let menuItem: { status: string } = this.menuItems[this.currentCategory][
          listItemId
        ];
        let status = menuItem.status;
        status = status == "normal" ? "sold-out" : "normal";
        menuItem.status = status;
        this.setState(this.menuItems[this.currentCategory]);
        store.setLocalStorage(
          this.currentCategory,
          this.menuItems[this.currentCategory]
        );
      }
    });

    DOM.$categoryNav.addEventListener("click", (e) => {
      if (this.isContainedClass("cafe-category-name", e)) {
        const target = e.target as HTMLElement;
        this.currentCategory = target.dataset.categoryName!;
        DOM.$menuTitle.innerHTML = `${target.textContent} 메뉴 관리`;
        if (this.menuItems[this.currentCategory]) {
          this.menuItems[this.currentCategory] = store.getLocalStorage(
            this.currentCategory
          );
          if (!this.menuItems[this.currentCategory])
            this.menuItems[this.currentCategory] = [];

          this.setState(this.menuItems[this.currentCategory]);
        }
      }
    });
  };
}

new App();
