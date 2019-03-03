import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PdfRoutingModule} from './pdf-routing.module';
import {PdfComponent} from './pdf.component';
import {PdfGeneralModule} from './general/pdf-general.module';
import {PdfSkillsModule} from './skills/pdf-skills.module';

@NgModule({
  declarations: [
    PdfComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfRoutingModule,
    PdfGeneralModule,
    PdfSkillsModule,
  ]
})
export class PdfModule {
}
