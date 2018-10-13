import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CarritoService } from './shared/carrito.service';
import { IMenu } from './menu-list/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kenji-bento-app';
  public menusSeleccionados$: Observable<IMenu[]>; //ver que es el $

  constructor(private carritoService: CarritoService) { 
    this.menusSeleccionados$ = this.carritoService.getMenus();

    this.menusSeleccionados$.subscribe(x => x);
   } 

}