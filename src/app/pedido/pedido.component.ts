import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Cliente } from './cliente';
import { CarritoItem } from '../carrito/carrito-item';
import { PedidoService } from '../services/pedido.service';
import { CarritoService } from '../services/carrito.service';
import { ConfirmacionComponent } from './confirmacion-modal/confirmacion.component';
import { ErrorComponent } from '../shared/error/error.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  profileForm: FormGroup;
  numeroPedido: number;
  mensajeDeError: string;
  items: CarritoItem[] = [];
  
  constructor(private carritoService: CarritoService, 
              private pedidoService: PedidoService, 
              private modalService: NgbModal) {
    this.profileForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      efectivo: new FormControl('', [Validators.required, Validators.min(100), Validators.maxLength(5000)])
    });
   }

  ngOnInit() {
    this.carritoService.getItems().subscribe(menus => this.items = menus);
  }

  onSubmit() {
    let cliente: Cliente = {
      nombre: this.profileForm.get('nombre').value,
      apellido: this.profileForm.get('apellido').value,
      direccion: this.profileForm.get('direccion').value
    };
    this.crearPedido(cliente, this.profileForm.get('efectivo').value);
  }

  public crearPedido(datosCliente: Cliente, efectivo: number){
    const total = this.items.map(x=> x.menu.precio * x.cantidad).reduce((sum, current) => sum + current);
    if(efectivo < total) {
      this.mostrarError(`Por favor ingresá un importe mayor o igual al importe total del pedido ($${total}).`);
    } else {
      this.pedidoService.crearPedido(this.items, datosCliente, efectivo).subscribe(
        numeroPedido => {
          this.numeroPedido = numeroPedido;
          this.mostrarConfirmacion(this.numeroPedido);
          this.carritoService.vaciarCarrito();
        },
        error => {
          this.mostrarError("No pudimos registrar tu pedido, por favor intenta nuevamente más tarde.");
        },
      );
    }
  }

  public mostrarConfirmacion(numeroPedido: number) {
    const modalRef = this.modalService.open(ConfirmacionComponent);
        modalRef.componentInstance.numeroPedido = numeroPedido;
  }

  public mostrarError(mensajeError: string) {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.MensajeError = mensajeError;
  }
}
