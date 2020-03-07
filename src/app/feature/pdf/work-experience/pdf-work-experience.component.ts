import {Component} from '@angular/core';
import {PdfService} from '../../service/pdf.service';
import {WorkExperience} from '../model/pdf-document';

@Component({
  selector: 'app-pdf-work-experience',
  templateUrl: 'pdf-work-experience.component.html',
})
export class PdfWorkExperienceComponent {
  workExperienceSummaryMaxCharacters = 300;

  constructor(public service: PdfService) {
  }

  addExperience() {
    this.service.pdfDocument.workExperience.push(new WorkExperience());
  }

  removeRowFromWorkExperience(index: number) {
    this.service.pdfDocument.workExperience.splice(index, 1);
  }

  addDescription(description: any[]) {
    description.push({value: ''});
  }

  removeDescription(description: { value: string }[], index: number) {
    description.splice(index, 1);
  }

}
