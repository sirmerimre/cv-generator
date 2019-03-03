import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RemainingCharactersComponent} from './remaining-characters.component';

@NgModule({
  declarations: [
    RemainingCharactersComponent,
  ],
  exports: [
    RemainingCharactersComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class RemainingCharactersModule {
}
