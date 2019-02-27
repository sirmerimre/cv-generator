import {PDFDocument} from '../pdf/model/pdf-document';

export class PdfHelper {

  static getUsersDocumentData(): PDFDocument {
    const retVal = null;
    try {
      return JSON.parse(localStorage.getItem('pdf'));
    } catch (e) {
      return retVal;
    }
  }

  static setUsersDocumentData(document: PDFDocument) {
    localStorage.setItem('pdf', JSON.stringify(document));
  }

  static setParagraphFontSizeAndType(pdf: any, type: 'normal' | 'bold') {
    pdf.setFontSize(12);
    pdf.setFontType(type);
  }

  static setNormalFontSizeAndType(pdf: any, type:  'normal' | 'bold') {
    pdf.setFontSize(11);
    pdf.setFontType(type);
  }
}
