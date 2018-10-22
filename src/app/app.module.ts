import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberPickerModule } from 'ng-number-picker';

import { AppComponent } from './app.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NgbModalModule, NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PedidoComponent } from './pedido/pedido.component';
import { ConfirmacionComponent } from './pedido/confirmacion-modal/confirmacion.component';
import { ConsultaComponent } from './pedido/consulta/consulta.component';
import { ErrorComponent } from './shared/error/error.component';
import { RespuestaComponent } from './pedido/consulta-modal/respuesta/respuesta.component';
import { EstadoComponent } from './pedido/consulta/estado/estado.component';
import { ClientComponent } from './_layout/client/client.component';
import { AdminComponent } from './_layout/admin/admin.component';
import { AppRoutingModule } from './app.routing.module';
import { ConsultaAdminComponent } from './admin/consulta-admin/consulta-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    CarritoComponent,
    PedidoComponent,
    ConfirmacionComponent,
    ConsultaComponent,
    ErrorComponent,
    RespuestaComponent,
    EstadoComponent,
    ClientComponent,
    AdminComponent,
    ConsultaAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule.forRoot(),
    FormsModule,
    NumberPickerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule.forRoot(),
  ],
  entryComponents:[ 
    ConfirmacionComponent, 
    EstadoComponent,
    ErrorComponent 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }