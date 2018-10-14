import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CarritoService } from './shared/carrito.service';
import { CarritoItem } from './carrito/carrito-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kenji-bento-app';
  public menusSeleccionados$: Observable<CarritoItem[]>; //ver que es el $

  constructor(private carritoService: CarritoService) { 
    this.menusSeleccionados$ = this.carritoService.getItems();

    this.menusSeleccionados$.subscribe(x => x);
   }
}