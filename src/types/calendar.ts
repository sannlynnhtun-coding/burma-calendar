export interface Holiday {
  month: string;
  name: string;
  dates: string[];
  total_days: number;
  nameEn?: string;
  type?: string;
}

export interface CalendarData {
  year: number;
  holidays: Holiday[];
}

export interface DayInfo {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isHoliday: boolean;
  holidayName?: string;
  isToday: boolean;
  isWeekend: boolean;
}
