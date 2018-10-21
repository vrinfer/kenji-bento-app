import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Menu } from 'src/app/menu-list/menu';
import { CarritoService } from '../services/carrito.service';
import { CarritoItem } from './carrito-item';
import { PedidoService } from '../services/pedido.service';
import { Cliente } from '../pedido/cliente';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  numeroPedido: number;
  mensajeDeError: string;
  cliente: Cliente;
  efectivo: number;
  items: CarritoItem[] = [];
  
  constructor(private carritoService: CarritoService, 
              private pedidoService: PedidoService, 
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.carritoService.getItems().subscribe(menus => this.items = menus);
  }

  public sacarDelCarrito(menu: Menu) {
    this.carritoService.sacarDelCarrito(menu);
  }

  public pedir(content) {
    this.router.navigate(['/pedido']);
  }

  public volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
