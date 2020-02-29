export class PDFDocument {
  title = '';
  firstName = '';
  lastName = '';
  mobile = '';
  email = '';
  profSummary = '';
  skills = '';
  skillsTable: Skills[] = [];
  workExperience: WorkExperience[] = [];
}

export class Skills {
  skillName: string;
  skillDefinition: string;
}

export class WorkExperience {
  date: { year: number, month: number, day: number };
  role: string;
  companyName: string;
  description = [{value: ''}];
}
