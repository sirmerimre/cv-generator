import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PdfRoutingModule} from './pdf-routing.module';
import {PdfComponent} from './pdf.component';

@NgModule({
  declarations: [
    PdfComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfRoutingModule,
  ]
})
export class PdfModule {
}
