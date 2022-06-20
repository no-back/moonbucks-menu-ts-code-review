import Component from "../core/Component";
import { CATEGORY_NAME } from "../utils/const";

interface Props {
  category: string;
  menuItems: Menu[];
}

export default class MenuForm extends Component<Props> {
  init(): void {}
  template(): string {
    const { category, menuItems } = this.props as Props;
    console.log("menuItems", menuItems, category);
    return `
        <h2 class="mt-1">${CATEGORY_NAME[category]} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${
          menuItems?.length ? menuItems.length : 0
        }개</span>
        `;
  }
  componentDidMount(): void {}
  setEvent(): void {}
}
