import { Component, OnInit } from '@angular/core';
import { IMenu } from './menu';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  imageWidth: number = 300;
  imageMargin: number = 2;
  menus: IMenu[] = [];

  constructor() { }

  ngOnInit() {
      this.menus = [
        {
          "id": 1,
          "descripcion": "salteado de arroz con vegetales",
          "imagen": "https://openclipart.org/image/800px/svg_to_png/301321/publicdomainq-bento.png",
          "precio": 200
        },
        {
          "descripcion": "udon",
          "imagen": "https://openclipart.org/image/800px/svg_to_png/66865/ramen.png",
          "precio": 325,
          "id": 2
        },
        {
          "descripcion": "ramen",
          "imagen": "https://openclipart.org/image/800px/svg_to_png/66865/ramen.png",
          "precio": 60,
          "id": 3
        }
      ];
  }

}
