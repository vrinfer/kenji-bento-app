import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './_layout/client/client.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ConsultaComponent } from './pedido/consulta/consulta.component';
import { AdminComponent } from './_layout/admin/admin.component';
import { ConsultaAdminComponent } from './admin/consulta-admin/consulta-admin.component';

/**
 * Route constant 
 */
const routes: Routes = [
    { path: '', component: ClientComponent, data: { 
        title: 'Cliente' }, 
        children: [
            { path: 'menus', component: MenuListComponent },
            { path: 'carrito', component: CarritoComponent },
            { path: 'pedido', component: PedidoComponent },
            { path: 'consulta-pedido', component: ConsultaComponent},
            { path: 'consulta-admin', component: ConsultaAdminComponent },
            { path: '', redirectTo: 'menus', pathMatch: 'full' },
            { path: '**', redirectTo: 'menus', pathMatch: 'full' },
        ] 
    },
    // { path: '', component: AdminComponent, data: { 
    //     title: 'Admin' }, 
    //     children: [
    //         { path: 'consulta-admin', component: ConsultaAdminComponent }
    //     ] 
    // }
    // { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
    // { path: '**', redirectTo: 'login' }
];
 
/**
 * App routing module
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }