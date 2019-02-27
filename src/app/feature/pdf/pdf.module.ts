import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PdfRoutingModule} from './pdf-routing.module';
import {PdfComponent} from './pdf.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PdfGeneralModule} from './general/pdf-general.module';

@NgModule({
  declarations: [
    PdfComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PdfGeneralModule,
  ]
})
export class PdfModule {
}
