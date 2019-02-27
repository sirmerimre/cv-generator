import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import {PdfHelper} from '../helper/pdf.helper';
import {PdfService} from '../service/pdf.service';

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @ViewChild('iframe', {read: ElementRef}) iframe: ElementRef;

  constructor(public service: PdfService) {
  }

  ngOnInit() {
    const pdf = PdfHelper.getUsersDocumentData();
    if (pdf) {
      this.service.pdfdocument = pdf;
    }
  }


  private initPdf(): jsPDF {
    const document = this.service.pdfdocument;
    const pdf = new jsPDF();

    pdf.setProperties({
      title: document.title ? document.title : 'Document'
    });

    if (this.service.imageSrc) {
      pdf.addImage(this.service.imageSrc, 'JPEG', 170, 15, 20, 20);
    }

    pdf.setFont('helvetica');
    pdf.setFontSize(16);
    pdf.setFontType('bold');
    pdf.text(document.name, 105, 20, 'center');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    pdf.text('Location: ' + document.location, 105, 30, 'center');
    pdf.text('Mobile: ' + document.mobile + ' Email: ' + document.email, 105, 35, 'center');

    PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
    pdf.text('PROFESSIONAL SUMMARY', 25, 45, 'left');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    const splitProfSummary = pdf.splitTextToSize(document.profSummary, 160);
    pdf.text(splitProfSummary, 25, 55, 'left');

    return pdf;

  }

  previewPdf() {
    const pdf = this.initPdf();
    PdfHelper.setUsersDocumentData(this.service.pdfdocument);
    this.iframe.nativeElement.setAttribute('src', pdf.output('datauristring'));
  }

  downloadPdf() {
    const pdf = this.initPdf();
    pdf.save(this.service.pdfdocument.title);
  }
}
