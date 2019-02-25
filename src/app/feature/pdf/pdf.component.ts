import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @ViewChild('iframe', {read: ElementRef}) iframe: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  generatePdf() {
    const pdf = new jsPDF();
    const source = document.querySelectorAll('#document')[0];
    const specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '#bypassme': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };
    const margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
      },

      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
      }, margins);
  }

  previewPdf() {
    const pdf = new jsPDF();
    const source = document.querySelectorAll('#document')[0];
    const specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '#bypassme': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };
    const margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };

    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
      });


    this.iframe.nativeElement.setAttribute('src', pdf.output('datauristring'));
  }

  initPdf() {

  }

}
