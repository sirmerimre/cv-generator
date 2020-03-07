import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {PdfHelper} from '../helper/pdf.helper';
import {PdfService} from '../service/pdf.service';
import {IChangePageSubject, PDFDocument, WorkExperience} from './model/pdf-document';
import {PdfTable} from './table/pdf-table';
import {DateHelper} from '../helper/date.helper';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit, OnDestroy {

  get textCurrentPosition(): number {
    return this._textCurrentPosition;
  }

  @ViewChild('iframe', {read: ElementRef}) iframe: ElementRef;

  private _changePageHeight = new BehaviorSubject<IChangePageSubject>({value: 0});
  private pageHeightChange = this._changePageHeight.asObservable();

  private _textCurrentPosition = 0;
  private pageNumber = 1;
  private pdfLeftMargin = 25;
  private pdfRightMargin = 20;
  private pdfBottomMargin = 20;
  private pdfWidthInMM = 210;
  private pageHeightInMM = 297 - this.pdfBottomMargin;

  private pdf: jsPDF;

  constructor(public service: PdfService) {
  }

  ngOnInit() {
    this.service.pdfDocument = new PDFDocument();
    const pdf = PdfHelper.getUsersDocumentData();
    if (pdf) {
      this.service.pdfDocument = pdf;
    }
    this.pageHeightChange.subscribe((data: IChangePageSubject) => {
      if (data.value && !data.addUp) {
        this._textCurrentPosition = data.value;
      } else if (data.value && data.addUp) {
        this._textCurrentPosition += data.value;
      } else if (data.reset) {
        this._textCurrentPosition = 0;
      }
      this.breakPage();
    });
  }

  ngOnDestroy() {
    this._changePageHeight.complete();
  }

  private fillPdfWithData(): void {
    this.pdf = new jsPDF('portrait', 'mm', 'a4');
    this.resetPageProps();

    this.pdf.setProperties({
      title: this.service.pdfDocument.title ? this.service.pdfDocument.title : 'Document',
    });

    this.setGeneralSection();
    this.setSkillsSection();
    this.setWorkExperience();

  }

  previewPdf() {
    this.fillPdfWithData();
    PdfHelper.setUsersDocumentData(this.service.pdfDocument);
    this.iframe.nativeElement.setAttribute('src', this.pdf.output('datauristring'));
  }

  downloadPdf() {
    this.fillPdfWithData();
    this.pdf.save(this.service.pdfDocument.title);
  }

  private setGeneralSection() {
    // GENERAL
    this.pdf.setFont('helvetica');
    this.pdf.setFontSize(16);
    this.pdf.setFontType('bold');
    this.pdf.text(this.service.pdfDocument.firstName + ' ' + this.service.pdfDocument.lastName, 105, 20, 'center');

    this.setNormalFonts();
    this.pdf.text('Mobile: ' + this.service.pdfDocument.mobile + ' Email: ' + this.service.pdfDocument.email, 105, 35, 'center');

    this.setBoldParagraph();
    this.pdf.text('PROFESSIONAL SUMMARY', this.pdfLeftMargin, 45, 'left');

    this.setNormalFonts();
    const splitProfSummary = this.pdf.splitTextToSize(this.service.pdfDocument.profSummary, 160);
    this.pdf.text(splitProfSummary, this.pdfLeftMargin, 55, 'left');
  }

  private setSkillsSection() {
    this.setBoldParagraph();
    this.pdf.text('KEY SKILLS & ACHIEVEMENTS', this.pdfLeftMargin, 100, 'left');

    this.setNormalFonts();
    const splitSkillsSummary = this.pdf.splitTextToSize(this.service.pdfDocument.skills, 160);
    this.pdf.text(splitSkillsSummary, this.pdfLeftMargin, 110, 'left');

    // this._changePageHeight.next({value: 0});

    // SKILLS TABLE
    if (this.service.pdfDocument.skillsTable.length) {
      this.setBoldParagraph();

      this.pdf.text('MAIN TECHNICAL SKILLS', this.pdfLeftMargin, 135, 'left');
      const pdfTable = PdfTable.generateSkillsTable(this.pdf, this.service.pdfDocument.skillsTable);
      const afterTablePosition = PdfTable.getTableEndYPosition(pdfTable);

      this._changePageHeight.next({value: afterTablePosition});
      this._changePageHeight.next({value: 10, addUp: true});
      this.setBoldParagraph();

      this.pdf.text('WORK EXPERIENCE', this.pdfLeftMargin, this.textCurrentPosition, 'left');
    } else {
      this._changePageHeight.next({value: 140});
      this.setBoldParagraph();
      this.pdf.text('WORK EXPERIENCE', this.pdfLeftMargin, this.textCurrentPosition, 'left');
    }
  }

  private setWorkExperience(): void {
    if (this.service.pdfDocument.workExperience.length) {
      this.service.pdfDocument.workExperience.forEach((w: WorkExperience) => {
        this.setBoldParagraph();
        this._changePageHeight.next({value: 15, addUp: true});

        this.pdf.text(
          DateHelper.formatDate(w.startDate) + ' - ' + DateHelper.formatDate(w.endDate),
          this.pdfLeftMargin,
          this.textCurrentPosition,
          'left');

        this._changePageHeight.next({value: 10, addUp: true});

        this.pdf.text(w.role + ' ' + w.companyName, this.pdfLeftMargin, this.textCurrentPosition, 'left');

        if (w.description) {
          this.setNormalFonts();
          const splitWorkExperienceSummary = this.pdf.splitTextToSize(w.description, 160);
          this._changePageHeight.next({value: 10, addUp: true});
          this.pdf.text(splitWorkExperienceSummary, this.pdfLeftMargin, this.textCurrentPosition, 'left');
          const textDimensions = this.pdf.getTextDimensions(splitWorkExperienceSummary);
          this._changePageHeight.next({value: textDimensions.h, addUp: true});
        }
      });
    }
  }

  private breakPage(): void {
    if (this._textCurrentPosition >= this.pageHeightInMM) {
      this.pageNumber++;
      this.pdf.addPage();
      this.pdf.setPage(this.pageNumber);
      this._textCurrentPosition = 0;
    }
  }

  private setBoldParagraph(): void {
    PdfHelper.setParagraphFontSizeAndType(this.pdf, 'bold');
  }

  private setNormalFonts(): void {
    PdfHelper.setNormalFontSizeAndType(this.pdf, 'normal');
  }

  private resetPageProps(): void {
    this._changePageHeight.next({reset: true});
    this.pageNumber = 1;
  }

}
