import {Skills} from '../model/pdf-document';

export class PdfTable {

  public static generateSkillsTable(pdf: any, skills: Skills[]) {
    let body = [];

    if (skills.length) {
      body = skills.map(i => {
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
        headStyles: {halign: 'left', fillColor: '#ced4da', textColor: '#000000'},
        bodyStyles: {halign: 'left', cellWidth: 70},
        startY: 140,
        body: body
      });
    }
    return pdf;
  }

  public static getTableEndYPosition(pdfTable): number {
    return pdfTable.previousAutoTable.finalY;
  }
}
