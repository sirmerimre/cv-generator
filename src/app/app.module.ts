import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopMenuModule} from './feature/top-menu/top-menu.module';
import {PdfService} from './feature/service/pdf.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeModule} from './feature/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TopMenuModule,
    HomeModule
  ],
  providers: [
    PdfService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
