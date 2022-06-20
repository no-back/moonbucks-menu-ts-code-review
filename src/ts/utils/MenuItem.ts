export interface Item {
  id: Number;
  soldOut: Boolean;
  name: string;
}

const menuItemTemplate = (item: Item) => {
  return `
    <li 
      class="menu-list-item d-flex items-center py-2" data-menu-id=${item.id}>
      <span class="${item.soldOut ? "sold-out" : ""}  w-100 pl-2 menu-name">${
    item.name
  }</span>
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
        `;
};

export default menuItemTemplate;
