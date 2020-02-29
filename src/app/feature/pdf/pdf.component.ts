import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {PdfHelper} from '../helper/pdf.helper';
import {PdfService} from '../service/pdf.service';
import {PDFDocument} from './model/pdf-document';
import {PdfTable} from './table/pdf-table';
import {DateHelper} from '../helper/date.helper';

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @ViewChild('iframe', {read: ElementRef}) iframe: ElementRef;

  pdfLeftMargin = 25;
  pageHeight = 295;

  constructor(public service: PdfService) {
  }

  ngOnInit() {
    this.service.pdfdocument = new PDFDocument();
    const pdf = PdfHelper.getUsersDocumentData();
    if (pdf) {
      this.service.pdfdocument = pdf;
    }
  }

  private fillPdfWithdata(): jsPDF {
    const document = this.service.pdfdocument;
    const pdf = new jsPDF('portrait', 'mm', 'a4');

    pdf.setProperties({
      title: document.title ? document.title : 'Document',
    });

    console.log(pdf.internal.pageSize.getHeight());

    // GENERAL
    pdf.setFont('helvetica');
    pdf.setFontSize(16);
    pdf.setFontType('bold');
    pdf.text(document.firstName + ' ' + document.lastName, 105, 20, 'center');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    pdf.text('Mobile: ' + document.mobile + ' Email: ' + document.email, 105, 35, 'center');

    PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
    pdf.text('PROFESSIONAL SUMMARY', this.pdfLeftMargin, 45, 'left');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    const splitProfSummary = pdf.splitTextToSize(document.profSummary, 160);
    pdf.text(splitProfSummary, this.pdfLeftMargin, 55, 'left');

    // SKILLS
    PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
    pdf.text('KEY SKILLS & ACHIEVEMENTS', this.pdfLeftMargin, 100, 'left');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    const splitSkillsSummary = pdf.splitTextToSize(document.skills, 160);
    pdf.text(splitSkillsSummary, this.pdfLeftMargin, 110, 'left');

    let currentPosition = 0;

    // SKILLS TABLE
    if (this.service.pdfdocument.skillsTable.length) {
      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('MAIN TECHNICAL SKILLS', this.pdfLeftMargin, 135, 'left');
      const pdfTable = PdfTable.generateSkillsTable(pdf, this.service.pdfdocument.skillsTable);
      const afterTablePosition = PdfTable.getTableEndYPosition(pdfTable);

      currentPosition = afterTablePosition;

      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('WORK EXPERIENCE', this.pdfLeftMargin, currentPosition += 10, 'left');
    } else {
      currentPosition = 140;
      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('WORK EXPERIENCE', this.pdfLeftMargin, currentPosition, 'left');
    }

    if (this.service.pdfdocument.workExperience.length) {
      this.service.pdfdocument.workExperience.forEach(w => {
        pdf.text(DateHelper.formatDate(w.date), this.pdfLeftMargin, currentPosition += 10, 'left');
        pdf.text(w.role + ' ' + w.companyName, this.pdfLeftMargin, currentPosition += 10, 'left');
      });

      if (currentPosition >= this.pageHeight) {
        pdf.addPage();
        pdf.setPage(2);
      }

      console.log(currentPosition);
    }

    return pdf;
  }

  previewPdf() {
    const pdf = this.fillPdfWithdata();
    PdfHelper.setUsersDocumentData(this.service.pdfdocument);
    this.iframe.nativeElement.setAttribute('src', pdf.output('datauristring'));
  }

  downloadPdf() {
    const pdf = this.fillPdfWithdata();
    pdf.save(this.service.pdfdocument.title);
  }

}
