import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PdfRoutingModule} from '../pdf-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PdfSkillsComponent} from './pdf-skills.component';
import {RemainingCharactersModule} from '../../remaining-characters/remaining-characters.module';

@NgModule({
  declarations: [
    PdfSkillsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RemainingCharactersModule,
  ],
  exports: [
    PdfSkillsComponent,
  ]
})
export class PdfSkillsModule {
}
