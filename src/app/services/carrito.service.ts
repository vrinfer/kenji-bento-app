import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';

import { Menu } from '../menu-list/menu';
import { CarritoItem } from '../carrito/carrito-item';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private itemsEnCarritoSubject: BehaviorSubject<CarritoItem[]> = new BehaviorSubject([]);
  private itemsEnCarrito: CarritoItem[] = [];

  constructor() { 
    this.itemsEnCarritoSubject.subscribe(x => this.itemsEnCarrito = x);
  }

  public agregarAlCarrito(menu: Menu, cantidad: number = 1) {
    const item = this.itemsEnCarrito.find(x => x.menu === menu);
    if(item !== undefined) {
      item.cantidad += cantidad;
      this.itemsEnCarritoSubject.next([...this.itemsEnCarrito]);
    } else {
      const newItem = new CarritoItem(menu, cantidad);
      this.itemsEnCarritoSubject.next([...this.itemsEnCarrito, newItem]);
    }
    console.log('Se agregaron: ' + cantidad + ' menú/s ' + menu.id); 
  }

  public sacarDelCarrito(menu: Menu) {
    const menusActuales = [...this.itemsEnCarrito];
    const menusRestantes = menusActuales.filter(x => x.menu.id !== menu.id);
    this.itemsEnCarritoSubject.next(menusRestantes);
  }

  public modificarCantidad(menu: Menu, cantidad: number) {
    const item = this.itemsEnCarrito.find(x => x.menu === menu);
  
    if(item !== undefined) {
      item.cantidad = cantidad;
    } 
    this.itemsEnCarritoSubject.next([...this.itemsEnCarrito]);
  }

  public getItems() : Observable<CarritoItem[]> {
    return this.itemsEnCarritoSubject;
  }

  public vaciarCarrito(): void{
    this.itemsEnCarritoSubject.next([]);
    this.itemsEnCarrito = [];
  }
}
