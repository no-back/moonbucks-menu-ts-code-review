export default abstract class Component {
  protected state: object;
  constructor(protected domNode: Element | null, protected props?: object) {
    this.state = {};
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
    }
  }

  abstract setEvent(): void;

  setState(newState: object) {
    this.state = newState;
    this.render();
  }
}
