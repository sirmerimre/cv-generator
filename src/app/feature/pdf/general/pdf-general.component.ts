import {Component} from '@angular/core';
import {PdfService} from '../../service/pdf.service';

@Component({
  selector: 'app-pdf-general',
  templateUrl: 'pdf-general.component.html',
})
export class PdfGeneralComponent {

  constructor(public  service: PdfService) {
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.service.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
