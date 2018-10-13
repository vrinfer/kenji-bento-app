import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';

import { IMenu } from '../menu-list/menu';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private menusEnCarritoSubject: BehaviorSubject<IMenu[]> = new BehaviorSubject([]);
  private menusEnCarrito: IMenu[] = [];

  constructor() { 
    this.menusEnCarritoSubject.subscribe(x => this.menusEnCarrito = x);
  }

  public agregarAlCarrito(menu: IMenu) {
    this.menusEnCarritoSubject.next([...this.menusEnCarrito, menu]);
    console.log('Se agregó el menú: ' + menu.id); 
  }

  public sacarDelCarrito(menu: IMenu) {
    const menusActuales = [...this.menusEnCarrito];
    const menusRestantes = menusActuales.filter(x => x.id !== menu.id);
    this.menusEnCarritoSubject.next(menusRestantes);
  }

  public getMenus() : Observable<IMenu[]> {
    return this.menusEnCarritoSubject;
  }
}
