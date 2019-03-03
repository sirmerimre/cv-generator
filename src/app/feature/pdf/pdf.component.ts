import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {PdfHelper} from '../helper/pdf.helper';
import {PdfService} from '../service/pdf.service';
import {PDFDocument} from './model/pdf-document';

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
    this.service.pdfdocument = new PDFDocument();
    const pdf = PdfHelper.getUsersDocumentData();
    if (pdf) {
      this.service.pdfdocument = pdf;
    }
  }

  private fillPdfWithdata(): jsPDF {
    const document = this.service.pdfdocument;
    const pdf = new jsPDF();

    pdf.setProperties({
      title: document.title ? document.title : 'Document'
    });

    // GENERAL
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

    // SKILLS
    PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
    pdf.text('KEY SKILLS & ACHIEVEMENTS', 25, 100, 'left');

    PdfHelper.setNormalFontSizeAndType(pdf, 'normal');
    const splitSkillsSummary = pdf.splitTextToSize(document.skills, 160);
    pdf.text(splitSkillsSummary, 25, 110, 'left');

    // SKILLS TABLE
    if (this.service.pdfdocument.skillsTable.length) {
      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('MAIN TECHNICAL SKILLS', 25, 155, 'left');
      const pdfTable = this.generateTable(pdf);
      const afterTablePosition = this.getTableEndYPosition(pdfTable);

      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('AFTER TABLE', 25, afterTablePosition + 10, 'left');
    } else {
      PdfHelper.setParagraphFontSizeAndType(pdf, 'bold');
      pdf.text('AFTER TABLE', 25, 160, 'left');
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

  generateTable(pdf: any) {
    let body = [];

    if (this.service.pdfdocument.skillsTable.length) {
      body = this.service.pdfdocument.skillsTable.map(i => {
        const a = [];
        a.push(i.skillDefinition);
        a.push(i.skillName);
        return a;
      });

      pdf.autoTable({
        tableWidth: 160,
        showHead: 'firstPage',
        margin: 25,
        theme: 'grid',
        head: [['Skill Name', 'Skill Definition']],
        headStyles: {halign: 'center', fillColor: '#ced4da', textColor: '#000000'},
        bodyStyles: {halign: 'left', cellWidth: 10},
        startY: 160,
        body: body
      });
    }
    return pdf;
  }

  getTableEndYPosition(pdfTable: any): number {
    return pdfTable.previousAutoTable.finalY;
  }
}
