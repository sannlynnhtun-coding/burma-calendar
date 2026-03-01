import { CalendarData } from '../types/calendar';
import holidayData from './holidays.json';

interface HolidayData {
  years: Record<string, CalendarData>;
}

const holidaysMap: Record<number, CalendarData> = (holidayData as unknown as HolidayData).years as unknown as Record<number, CalendarData>;

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