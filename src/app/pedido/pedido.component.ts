import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder  } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Cliente } from './cliente';
import { CarritoItem } from '../carrito/carrito-item';
import { PedidoService } from '../services/pedido.service';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

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
              private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder) {
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
    this.pedidoService.crearPedido(this.items, datosCliente, efectivo).subscribe(
      numeroPedido => {
        this.numeroPedido = numeroPedido;
        const modalRef = this.modalService.open(ConfirmacionComponent);
        modalRef.componentInstance.numeroPedido = this.numeroPedido;
      },
      error => this.mensajeDeError = error,
      
    );
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}