import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberPickerModule } from 'ng-number-picker';

import { AppComponent } from './app.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule.forRoot(),
    FormsModule,
    NumberPickerModule,
    RouterModule.forRoot([
      { path: 'menus', component: MenuListComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: '', redirectTo: 'menus', pathMatch: 'full' },
      { path: '**', redirectTo: 'menus', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }