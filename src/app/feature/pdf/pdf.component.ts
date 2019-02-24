import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  generatePdf() {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
  }

  printPdf() {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.autoPrint({variant: 'non-conform'});
    doc.save('a4.pdf');

  }
}
