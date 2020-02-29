import {Component} from '@angular/core';
import {PdfService} from '../../service/pdf.service';

@Component({
  selector: 'app-pdf-general',
  templateUrl: 'pdf-general.component.html',
})
export class PdfGeneralComponent {

  professionalSummaryMaxCharacters = 700;

  constructor(public  service: PdfService) {
  }

}
