export class PDFDocument {
  title = '';
  name = '';
  location = '';
  mobile = '';
  email = '';
  profSummary = '';
  skills = '';
  skillsTable: Skills[] = [];
}

export class Skills {
  skillName: string;
  skillDefinition: string;
}
