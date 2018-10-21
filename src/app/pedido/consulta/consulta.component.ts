import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { PedidoService } from 'src/app/services/pedido.service';
import { EstadoComponent } from './estado/estado.component';
import { ErrorComponent } from 'src/app/shared/error/error.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  consultaForm: FormGroup;

  constructor(private pedidoService: PedidoService, private modalService: NgbModal) { 
    this.consultaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      numeroPedido: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {
  }
  
  onSubmit() {
    this.consultarPedido(this.consultaForm.get('nombre').value, 
                      this.consultaForm.get('apellido').value,
                      this.consultaForm.get('numeroPedido').value);
  }

  public consultarPedido(nombre: string, apellido: string, numeroPedido: number){
    this.pedidoService.consultarPedido(nombre, apellido, numeroPedido).subscribe(
      pedido => {
        if(pedido && pedido.estado) {
          this.mostrarEstado(pedido.estado);
        } else if(pedido) {
          this.mostrarError("No pudimos verificar el estado del pedido. Por favor intentá nuevamente más tarde.");
        } else {
          this.mostrarError("No tenemos registrado ningún pedido con los datos ingresados.");
        }
      },
      error =>{
        this.mostrarError("Ocurrió un error durante la consulta del pedido. Por favor intentá nuevamente más tarde.");
      }
    );
  }

  public mostrarEstado(estado: string) {
    const modalRef = this.modalService.open(EstadoComponent);
    modalRef.componentInstance.estadoPedido = estado;
  }

  public mostrarError(mensajeError: string) {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.MensajeError = mensajeError;
  }
}
