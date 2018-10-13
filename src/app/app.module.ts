import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CarritoComponent } from './carrito/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
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
