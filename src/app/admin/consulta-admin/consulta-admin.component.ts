import { Component, OnInit } from '@angular/core';

import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/pedido/pedido';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from 'src/app/shared/error/error.component';

@Component({
  selector: 'app-consulta-admin',
  templateUrl: './consulta-admin.component.html',
  styleUrls: ['./consulta-admin.component.css']
})
export class ConsultaAdminComponent implements OnInit {
  pedidos: Pedido[] = [];
  mensajeDeError : string = '';
  pedidoId: number;
  estado: string;

  constructor(private pedidoService: PedidoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(pedidos => this.pedidos = pedidos);
  }

  public seleccionarEstado(pedidoId: number, content) {
    this.pedidoId = pedidoId;
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.cambiarEstado();
    });
  }

  public setEstado(nuevoEstado: string) {
    this.estado = nuevoEstado;
  }

  public cambiarEstado() {
    this.pedidoService.cambiarEstadoPedido(this.pedidoId, this.estado).subscribe(
      respuesta => {
        this.pedidoService.getPedidos().subscribe(pedidos => this.pedidos = pedidos);
      },
      error => {
        this.mostrarError("No pudimos cambiar el estado del pedido.");
      },
    );
    this.pedidoId = 0;
    this.estado = '';
  }

  public mostrarError(mensajeError: string) {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.MensajeError = mensajeError;
  }
}