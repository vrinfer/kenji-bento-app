import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [LayoutComponent, HeaderComponent]
})
export class UiModule { }
