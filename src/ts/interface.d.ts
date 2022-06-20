interface Menu {
  menuName: string;
  soldOut: boolean;
  menuId: number;
}

interface CategoryMenu {
  [key: string]: Menu[];
}
