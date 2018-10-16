import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/menu-list/menu';
import { CarritoService } from 'src/app/shared/carrito.service';
import { CarritoItem } from './carrito-item';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: CarritoItem[] = [];
  
  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.carritoService.getItems().subscribe(menus => this.items = menus);
  }

  public sacarDelCarrito(menu: Menu) {
    debugger;
    this.carritoService.sacarDelCarrito(menu);
  }
}
