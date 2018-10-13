import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/menu-list/menu';
import { CarritoService } from 'src/app/shared/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  menus: IMenu[] = [];
  
  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.carritoService.getMenus().subscribe(menus => this.menus = menus);
  }

  public sacarDelCarrito(menu: IMenu) {
    this.carritoService.sacarDelCarrito(menu);
  }
}
