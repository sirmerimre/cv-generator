import {Component} from '@angular/core';
import {PdfService} from '../../service/pdf.service';

@Component({
  selector: 'app-pdf-skills',
  templateUrl: 'pdf-skills.component.html',
})
export class PdfSkillsComponent {

  constructor(public  service: PdfService) {
  }

  addRowToSkills() {
    this.service.pdfDocument.skillsTable.push({skillName: '', skillDefinition: ''});
  }

  removeRowFromSkills(index: number) {
    this.service.pdfDocument.skillsTable.splice(index, 1);
  }

}
