// import { MenuForm } from "./components";
import Component from "./core/Component";

export default class App extends Component {
  init(): void {}
  componentDidMount(): void {}
  setEvent(): void {}
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
}
