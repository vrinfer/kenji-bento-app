import { Component, OnInit } from '@angular/core';

import { IMenu } from './menu';
import { MenuService } from './menu.service';
import { CarritoService } from '../shared/carrito.service';

@Component({
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  imageWidth: number = 300;
  imageHeight: number = 160;
  imageMargin: number = 2;
  
  menus: IMenu[] = [];
  mensajeDeError : string = '';

  constructor(private menuService: MenuService, private carritoService: CarritoService) { }

  ngOnInit() {
      this.menuService.getMenus().subscribe(
        menus => this.menus = menus,
        error => this.mensajeDeError = error
      )
  }

  public agregarAlCarrito(menu: IMenu) {
    this.carritoService.agregarAlCarrito(menu);
  }

  public sacarDelCarrito(menu: IMenu) {
    this.carritoService.sacarDelCarrito(menu);
  }

}
