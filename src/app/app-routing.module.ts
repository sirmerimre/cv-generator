import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './feature/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pdf', loadChildren: () => import('./feature/pdf/pdf.module').then(m => m.PdfModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
