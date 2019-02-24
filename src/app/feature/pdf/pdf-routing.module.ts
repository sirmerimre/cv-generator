import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PdfComponent} from './pdf.component';

export const routes: Routes = [
  {path: '', component: PdfComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfRoutingModule {
}
