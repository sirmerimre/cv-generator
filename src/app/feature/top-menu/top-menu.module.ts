import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopMenuComponent} from './top-menu.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    TopMenuComponent,
  ],
  exports: [
    TopMenuComponent,

  ]
})
export class TopMenuModule {

}
