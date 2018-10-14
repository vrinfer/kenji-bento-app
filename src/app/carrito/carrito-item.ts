import { Menu } from "../menu-list/menu";

export class CarritoItem {
    menu: Menu;
    cantidad: number;

    constructor(menu: Menu, cantidad: number = 1) {
        this.menu = menu;
        this.cantidad = cantidad;
    }
}
