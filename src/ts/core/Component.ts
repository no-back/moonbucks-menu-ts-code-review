export default abstract class Component {
  protected state: object;
  constructor(protected domNode: HTMLInputElement, protected props: any) {
    this.state = {};
  }

  abstract init(): void;

  abstract componentDidMount(): void;

  abstract template(): string;

  render() {
    this.domNode.innerHTML = this.template();
  }

  abstract setEvent(): void;

  setState(newState: object) {
    this.state = newState;
    this.render();
  }
}
