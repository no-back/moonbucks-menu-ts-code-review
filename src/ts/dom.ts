import { $ } from "./util";

export const DOM = {
  $menuForm: $("#espresso-menu-form"),
  $menuList: $("#espresso-menu-list"),
  $menuNameInput: $("#espresso-menu-name") as HTMLDataElement,
  $submitButton: $("#espresso-menu-submit-button"),
  $counter: $(".menu-count"),
  $categoryNav: $("#cafe-category-nav"),
  $categoryName: $(".cafe-category-name") as HTMLElement,
  $menuTitle: $(".mt-1"),
};
