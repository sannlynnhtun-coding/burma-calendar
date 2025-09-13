export interface Holiday {
  month: string;
  name: string;
  dates: string[];
  total_days: number;
}

export interface CalendarData {
  year: number;
  holidays: Holiday[];
}

export interface DayInfo {
  day: number;
  isHoliday: boolean;
  holidayName?: string;
  isToday: boolean;
  isWeekend: boolean;
}