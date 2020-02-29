export class DateHelper {

  static readonly MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public static formatDate(dateObject: { year: number, month: number, day: number }): string {
    return DateHelper.MONTH_NAMES[(dateObject.month - 1 )] + ' ' + dateObject.year;
  }
}
