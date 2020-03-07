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
  startDate: { year: number, month: number, day: number };
  endDate: { year: number, month: number, day: number };
  role: string;
  companyName: string;
  description: string;
}

export interface IChangePageSubject {
  value?: number;
  reset?: boolean;
  addUp?: boolean;
}
