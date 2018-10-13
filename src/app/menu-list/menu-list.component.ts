import { Component, OnInit } from '@angular/core';

import { IMenu } from './menu';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  imageWidth: number = 300;
  imageHeight: number = 160;
  imageMargin: number = 2;
  
  menus: IMenu[] = [];
  mensajeDeError : string = '';

  constructor(private menuService: MenuService) { }

  ngOnInit() {
      this.menuService.getMenus().subscribe(
        menus => this.menus = menus,
        error => this.mensajeDeError = error
      )
  }

}
