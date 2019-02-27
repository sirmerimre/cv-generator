import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';

export class PDFDocument {
  title: string;
  name: string;
  body: string;
  footer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @ViewChild('iframe', {read: ElementRef}) iframe: ElementRef;

  imageSrc: any;
  PDFDocument: PDFDocument = new PDFDocument();

  constructor() {
  }

  ngOnInit() {
  }

  private initPdf(): jsPDF {
    const document = this.PDFDocument;
    const pdf = new jsPDF();

    pdf.setProperties({
      title: document.title ? document.title : 'Document'
    });

    // NAME

    pdf.setFontSize(11);
    pdf.setFont('calibri');
    pdf.setFontType('bold');
    pdf.text(document.name, 105, 20, 'center');

    // if (this.imageSrc) {
    //   pdf.addImage(this.imageSrc, 'JPEG', 5, 5, 40, 40);
    // }


    return pdf;

  }

  previewPdf() {
    const pdf = this.initPdf();
    this.iframe.nativeElement.setAttribute('src', pdf.output('datauristring'));
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
