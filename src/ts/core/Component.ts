interface Props {
  [key: string]: string | object;
}

export default abstract class Component<T> {
  constructor(protected domNode: Element, protected props?: T) {
    this.init();
    this.render();
    this.setEvent();
  }

  abstract init(): void;

  abstract componentDidMount(): void;

  abstract template(): string;

  render() {
    if (this.domNode) {
      this.domNode.innerHTML = this.template();
      this.componentDidMount();
    }
  }

  abstract setEvent(): void;
}
