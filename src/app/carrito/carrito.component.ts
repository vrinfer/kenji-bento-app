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
    // this.modalService.open(content).result.then((result) => {
    //   const datosCliente = this.cliente;
    //   this.crearPedido(this.items, datosCliente, this.efectivo);
    // });
  }

  public volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
