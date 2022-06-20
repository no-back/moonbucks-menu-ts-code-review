import Component from "../core/Component";
import { MESSAGE } from "../utils/const";
import { $ } from "../utils/DOM";

interface Props {
  menuItems: Menu[];
  updateMenu(newMenuName: string, targetId: number): void;
  deleteMenu(targetId: number): void;
  toggleSoldOut(targetId: number): void;
}

export default class MenuList extends Component<Props> {
  componentDidMount(): void {}
  init(): void {}
  template(): string {
    const { menuItems } = this.props as Props;
    return menuItems
      .map(
        ({ menuId, menuName, soldOut }) => `
        <li class="menu-list-item d-flex items-center py-2" data-id="${menuId}">
        <span class='w-100 pl-2 menu-name ${
          soldOut ? "sold-out" : ""
        }'>${menuName}</span>
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
      </li>
      `
      )
      .join("");
  }
  setEvent(): void {
    const { updateMenu, deleteMenu, toggleSoldOut } = this.props as Props;

    this.domNode.addEventListener("click", (e: Event) => {
      const { target } = e;
      if (!target) return;
      if (!(target as HTMLButtonElement)) return;

      const isUpdateButton = isClassExisted(
        target as HTMLElement,
        "menu-edit-button"
      );
      const isDeleteButton = isClassExisted(
        target as HTMLElement,
        "menu-remove-button"
      );
      const isSoldOutButton = isClassExisted(
        target as HTMLElement,
        "menu-sold-out-button"
      );

      const $li = (e.target as HTMLElement).closest(
        "[data-id]"
      ) as HTMLElement | null;

      if (isUpdateButton) {
        const originalMenuName = $li?.firstElementChild?.textContent;
        if (originalMenuName) {
          const newMenuName = prompt(MESSAGE.UPDATE, originalMenuName)?.trim();
          if (!newMenuName) return;
          updateMenu(newMenuName, Number($li?.dataset.id));
        }
      }

      if (isDeleteButton) {
        const isCheck = confirm(MESSAGE.DELETE);
        if (isCheck) deleteMenu(Number($li?.dataset.id));
      }
      if (isSoldOutButton) {
        toggleSoldOut(Number($li?.dataset.id));
      }
    });
  }
}

const isClassExisted = (target: HTMLElement, selector: string): boolean => {
  if (target instanceof HTMLButtonElement) {
    return target.classList.contains(selector);
  }
  return false;
};
