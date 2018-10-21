import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap  } from 'rxjs/operators';

import { Pedido } from '../pedido/pedido';
import { CarritoItem } from '../carrito/carrito-item';
import { Cliente } from '../pedido/cliente';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private serviceUrl = 'http://localhost:3000/pedidos';

  constructor(private http : HttpClient) {}

  //TODO chequear que onda esto porque mepa que no pasa
  //TODO Agregar validación de precio / datos del cliente
  public crearPedido(items: CarritoItem[], cliente: Cliente, efectivo: number): Observable<number> {
    let menus = items.map(item => ({menuId: item.menu.id, cantidad: item.cantidad}));
    return this.http.post<Pedido>(this.serviceUrl, 
      { 
        menus: menus, 
        cliente: cliente,
        importeTotal: items.map(x=> x.menu.precio * x.cantidad).reduce((sum, current) => sum + current),
        efectivo: efectivo,
      }, 
      { 
        headers: new HttpHeaders({'Content-Type':  'application/json' }), 
        observe: 'response' 
      })
      .pipe(map((response) => {
        return response.body.id;
      }));
  }

  public consultarPedido(id: number, email: string) {
    return this.http.get<Pedido[]>(this.serviceUrl + '/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getPedidos() : Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.serviceUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public cambiarEstadoPedido(numeroPedido: number, nuevoEstado: string) {
      //Fijarse que onda como está hecho esto en el dashboard de torchx.
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = 'An error occuerred: ${err.error.message}';
    } else {
        errorMessage = 'Server returnoed code: ${err.status}, error message is: $ {err.message}';
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}