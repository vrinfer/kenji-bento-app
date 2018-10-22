import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoItem } from 'src/app/carrito/carrito-item';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  title = 'kenji-bento-app';
  public menusSeleccionados$: Observable<CarritoItem[]>; //ver que es el $

  constructor(private carritoService: CarritoService) { 
    this.menusSeleccionados$ = this.carritoService.getItems();

    this.menusSeleccionados$.subscribe(x => x);
   }

  ngOnInit() {
  }
}
