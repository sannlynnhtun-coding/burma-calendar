import React, { useMemo } from 'react';
import { DayInfo, Holiday } from '../types/calendar';
import { ENGLISH_MONTHS, toMyanmarNumerals, WEEKDAYS } from '../utils/calendar';

interface CalendarGridProps {
  currentDate: Date;
  holidays: Holiday[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, holidays }) => {
  const days = useMemo((): DayInfo[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const today = new Date();
    const monthHolidays = holidays.filter((holiday) => holiday.month === ENGLISH_MONTHS[month]);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(year, month, index - firstWeekday + 1);
      const isCurrentMonth = date.getMonth() === month;
      const matchingHolidays = isCurrentMonth
        ? monthHolidays.filter((holiday) => holiday.dates.includes(String(date.getDate())))
        : [];

      return {
        day: date.getDate(),
        date,
        isCurrentMonth,
        isHoliday: matchingHolidays.length > 0,
        holidayName: matchingHolidays.map((holiday) => holiday.name).join(' / '),
        isToday:
          date.getFullYear() === today.getFullYear()
          && date.getMonth() === today.getMonth()
          && date.getDate() === today.getDate(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      };
    });
  }, [currentDate, holidays]);

  return (
    <section className="calendar-table-wrap" aria-label={`${ENGLISH_MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}>
      <div className="calendar-table" id="calendar-grid">
        <div className="weekday-row" role="row">
          {WEEKDAYS.map((weekday, index) => (
            <div
              className={`weekday ${index === 0 || index === 6 ? 'weekday--weekend' : ''}`}
              key={weekday.short}
              role="columnheader"
            >
              <strong>{weekday.short}</strong>
              <span>{weekday.myanmar}</span>
            </div>
          ))}
        </div>

        <div className="day-grid" role="grid">
          {days.map((dayInfo) => {
            const classes = [
              'day-cell',
              !dayInfo.isCurrentMonth ? 'day-cell--outside' : '',
              dayInfo.isWeekend ? 'day-cell--weekend' : '',
              dayInfo.isHoliday ? 'day-cell--holiday' : '',
              dayInfo.isToday ? 'day-cell--today' : '',
            ].filter(Boolean).join(' ');

            return (
              <div
                className={classes}
                key={dayInfo.date.toISOString()}
                role="gridcell"
                aria-label={dayInfo.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              >
                <div className="day-meta">
                  <span className="day-myanmar-number">{toMyanmarNumerals(dayInfo.day)}</span>
                  {dayInfo.isToday && <span className="today-marker">ယနေ့</span>}
                </div>

                <span className="day-number">{dayInfo.day}</span>

                {dayInfo.isHoliday && (
                  <span className="holiday-name" title={dayInfo.holidayName}>
                    {dayInfo.holidayName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
