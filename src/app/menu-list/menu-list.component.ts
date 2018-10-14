import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberPickerComponent } from 'ng-number-picker';

import { Menu } from './menu';
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
  
  menus: Menu[] = [];
  cantidadSeleccionada: number;

  mensajeDeError : string = '';

  constructor(private menuService: MenuService, private carritoService: CarritoService, private modalService: NgbModal) { }

  ngOnInit() {
      this.menuService.getMenus().subscribe(
        menus => this.menus = menus,
        error => this.mensajeDeError = error
      )
  }

  ngOnChange() {
    this.menuService.getMenus().subscribe(
      menus => this.menus = menus,
      error => this.mensajeDeError = error
    )
  }

  public agregarAlCarrito(menu: Menu, content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      debugger;
      this.carritoService.agregarAlCarrito(menu, this.cantidadSeleccionada);
    });
  }

  public sacarDelCarrito(menu: Menu) {
     this.carritoService.sacarDelCarrito(menu);
  }
}
