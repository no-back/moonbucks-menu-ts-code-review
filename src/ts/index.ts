const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};

function App(this: any) {
  // init Variables
  const $menuForm = $("#espresso-menu-form");
  const $menuList = $("#espresso-menu-list");
  const $menuNameInput = $("#espresso-menu-name") as HTMLDataElement;
  const $submitButton = $("#espresso-menu-submit-button");
  const $counter = $(".menu-count");
  const $categoryNav = $("#cafe-category-nav");
  const $categoryName = $(".cafe-category-name");
  const $menuTitle = $(".mt-1");

  this.init = () => {
    this.currentCategory = $categoryName?.dataset.categoryName;
    this.menuItems = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      dessert: [],
    };

    this.menuItems[this.currentCategory] = JSON.parse(
      localStorage.getItem(this.currentCategory) as string
    );
    if (!this.menuItems[this.currentCategory])
      this.menuItems[this.currentCategory] = [];

    initEventHandlers();
    render();
  };

  const setState = (menuItems: any) => {
    if (this.menuItems[this.currentCategory] !== menuItems) {
      this.menuItems[this.currentCategory] = menuItems;
    }
    render();
  };

  const render = () => {
    if (this.menuItems[this.currentCategory]) {
      $menuList.innerHTML = this.menuItems[this.currentCategory]
        .map((item: { status: any; menuName: any }, index: any) => {
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
      updateMenuCount();
      $menuNameInput.value = "";
      $menuNameInput.focus();
    }
  };

  // Functions
  const addMenuItem = () => {
    if (isDuplicatedMenuName($menuNameInput.value)) {
      alert("이미 동일한 메뉴명이 있습니다.");
      $menuNameInput.value = "";
      $menuNameInput.focus();
      return;
    }
    if ($menuNameInput.value.trim() === "") {
      alert("공백 값을 입력하셨습니다.");
      $menuNameInput.value = "";
      $menuNameInput.focus();
      return;
    }
    const menuItemInfo = {
      menuName: $menuNameInput.value,
      category: this.currentCategory,
      status: "normal", // || sold-out
    };
    this.menuItems[this.currentCategory].push(menuItemInfo);
    setState(this.menuItems[this.currentCategory]);
    localStorage.setItem(
      this.currentCategory,
      JSON.stringify(this.menuItems[this.currentCategory])
    );
  };

  const modifyMenuItem = (e: Event) => {
    const target = e.target as Element;
    const $listItem = target.closest("li");
    const $menuName = $listItem?.querySelector(".menu-name");
    const promptText = $menuName?.textContent;
    const newMenuName = prompt(
      "수정할 메뉴명을 적어주세요.",
      promptText ? promptText : undefined
    );

    if (newMenuName === $menuName?.textContent) {
      alert("기존과 동일한 메뉴명입니다.");
    } else if (newMenuName === "") {
      alert("값을 입력해주세요.");
    } else if (newMenuName !== null) {
      const listItemId = $listItem?.dataset.id;
      if (listItemId === undefined) return;
      this.menuItems[this.currentCategory][listItemId].menuName = newMenuName;
      setState(this.menuItems[this.currentCategory]);
      localStorage.setItem(
        this.currentCategory,
        JSON.stringify(this.menuItems[this.currentCategory])
      );
    }
  };

  const removeMenuItem = (e: Event) => {
    const target = e.target as Element;
    const $listItem = target.closest("li");
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      this.menuItems[this.currentCategory].splice($listItem?.dataset.id, 1);
      setState(this.menuItems[this.currentCategory]);
      localStorage.setItem(
        this.currentCategory,
        JSON.stringify(this.menuItems[this.currentCategory])
      );
    }
  };

  const updateMenuCount = () => {
    const menuCount = $menuList.querySelectorAll("li").length;
    $counter.textContent = `총 ${menuCount} 개`;
  };

  const isContainedClass = (className: string, e: Event) => {
    const target = e.target as Element;
    if (target.classList.contains(className)) return true;
    else return false;
  };

  const isDuplicatedMenuName = (newMenuName: any) => {
    const duplicatedMenuItem = this.menuItems[this.currentCategory].find(
      (item: { menuName: any }) => {
        if (item.menuName == newMenuName) return item;
      }
    );
    if (duplicatedMenuItem) return true;
    return false;
  };

  const initEventHandlers = () => {
    $menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $menuNameInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && $menuNameInput.value !== "") addMenuItem();
    });

    $submitButton.addEventListener("click", () => {
      if ($menuNameInput.value === "") alert("값을 입력해주세요.");
      else addMenuItem();
    });

    $menuList.addEventListener("click", (e) => {
      if (isContainedClass("menu-edit-button", e)) modifyMenuItem(e);
      else if (isContainedClass("menu-remove-button", e)) removeMenuItem(e);
      else if (isContainedClass("menu-sold-out-button", e)) {
        const target = e.target as Element;
        const $listItem = target.closest("li");
        const listItemId = $listItem?.dataset.id;
        if (listItemId === undefined) return;
        let status = this.menuItems[this.currentCategory][listItemId].status;
        status = status == "normal" ? "sold-out" : "normal";
        this.menuItems[this.currentCategory][listItemId].status = status;
        setState(this.menuItems[this.currentCategory]);
        localStorage.setItem(
          this.currentCategory,
          JSON.stringify(this.menuItems[this.currentCategory])
        );
      }
    });

    $categoryNav?.addEventListener("click", (e) => {
      if (isContainedClass("cafe-category-name", e)) {
        const target = e.target as HTMLElement;
        this.currentCategory = target.dataset.categoryName;
        $menuTitle.innerHTML = `${target.textContent} 메뉴 관리`;
        if (this.menuItems[this.currentCategory]) {
          this.menuItems[this.currentCategory] = JSON.parse(
            localStorage.getItem(this.currentCategory) as string
          );
          if (!this.menuItems[this.currentCategory])
            this.menuItems[this.currentCategory] = [];
          setState(this.menuItems[this.currentCategory]);
        }
      }
    });
  };
}

const app = new App();
app.init();
