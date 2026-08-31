import { CalendarData } from '../types/calendar';
import holidayData from './holidays.json';
import holidayData2027 from './holidays-2027.json';

interface HolidayData {
  years: Record<string, CalendarData>;
}

interface RawHoliday2027 {
  date: string;
  month: number;
  day: number;
  name_en: string;
  name_mm: string;
  type: string;
}

const holidaysMap: Record<number, CalendarData> = {
  ...((holidayData as unknown as HolidayData).years as unknown as Record<number, CalendarData>),
  2027: {
    year: 2027,
    holidays: (holidayData2027 as RawHoliday2027[]).map((holiday) => ({
      month: new Date(`${holiday.date}T00:00:00`).toLocaleDateString('en-US', { month: 'long' }),
      name: holiday.name_mm,
      nameEn: holiday.name_en,
      dates: [String(holiday.day)],
      total_days: 1,
      type: holiday.type,
    })),
  },
};

// Get all available years dynamically
export const getAvailableYears = (): number[] => {
  return Object.keys(holidaysMap)
    .map(year => parseInt(year, 10))
    .sort((a, b) => a - b);
};

// Get holiday data for a specific year
export const getHolidaysForYear = (year: number): CalendarData | undefined => {
  return holidaysMap[year];
};

export { holidaysMap };
