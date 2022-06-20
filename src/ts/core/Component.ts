interface Props {
  [key: string]: string | object;
}

interface State {
  [index: string]: string | object;
  category: string;
  menu: { [key: string]: Menu[] };
}
export default abstract class Component<T> {
  protected state: State = { category: "espresso", menu: {} };
  constructor(protected domNode: Element, protected props?: T) {
    this.init();
    this.render();
    this.setEvent();
  }

  abstract init(): void;

  abstract componentDidMount(): void;

  abstract template(): string;

  abstract setEvent(): void;

  render() {
    if (this.domNode) {
      this.domNode.innerHTML = this.template();
      this.componentDidMount();
    }
  }
}
