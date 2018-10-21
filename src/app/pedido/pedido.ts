import { Menu } from "../menu-list/menu";
import { Cliente } from "./cliente";

export class Pedido {
    id: number;
    importeTotal: number;
    efectivo: number;
    fechaHora: Date;
    estado: "entregado";
    cliente: Cliente;
    menus: Menu[];
}