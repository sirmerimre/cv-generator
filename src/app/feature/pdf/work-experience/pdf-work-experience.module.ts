import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PdfRoutingModule} from '../pdf-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PdfWorkExperienceComponent} from './pdf-work-experience.component';
import {RemainingCharactersModule} from '../../remaining-characters/remaining-characters.module';
import {NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PdfWorkExperienceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RemainingCharactersModule,
    NgbTooltipModule,
    NgbDatepickerModule,
  ],
  exports: [
    PdfWorkExperienceComponent,
  ]
})
export class PdfWorkExperienceModule {
}
