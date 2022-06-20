import Component from "../core/Component";
import { $ } from "../utils/DOM";
import { CATEGORY_NAME } from "../utils/const";

interface Props {
  category: string;
  addMenu(params: string): void;
}
export default class MenuForm extends Component<Props> {
  init(): void {}
  template(): string {
    const { category } = this.props as Props;
    return `
      <div class="d-flex w-100">
          <label for="menu-name" class="input-label" hidden>
            ${CATEGORY_NAME[category]} 메뉴 이름
          </label>
          <input
            type="text"
            id="menu-name"
            name="menuName"
            class="input-field"
            placeholder="메뉴 이름"
            autocomplete="off"
          />
          <button
            type="submit"
            name="submit"
            id="menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
    `;
  }
  componentDidMount(): void {}
  setEvent(): void {
    const { addMenu } = this.props as Props;
    const menuName = $("#menu-name") as HTMLInputElement;
    this.domNode?.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      addMenu(menuName.value);
    });
  }
}
