import React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { ENGLISH_MONTHS } from '../utils/calendar';

interface MonthNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  availableYears: number[];
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
  currentDate,
  onDateChange,
  availableYears,
}) => {
  const minYear = availableYears[0];
  const maxYear = availableYears.at(-1);

  const moveMonth = (offset: number) => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleMonthChange = (month: number) => {
    onDateChange(new Date(currentDate.getFullYear(), month, 1));
  };

  const handleYearChange = (year: number) => {
    onDateChange(new Date(year, currentDate.getMonth(), 1));
  };

  const goToToday = () => {
    const today = new Date();
    const fallbackYear = maxYear ?? today.getFullYear();
    onDateChange(availableYears.includes(today.getFullYear()) ? today : new Date(fallbackYear, 0, 1));
  };

  const canGoBack = currentDate.getFullYear() !== minYear || currentDate.getMonth() !== 0;
  const canGoForward = currentDate.getFullYear() !== maxYear || currentDate.getMonth() !== 11;

  return (
    <nav className="calendar-toolbar" aria-label="Calendar navigation">
      <a className="calendar-brand" href="#calendar-grid" aria-label="Myanmar Calendar home">
        <img src="/logo.svg" alt="" />
        <span>
          <strong>မြန်မာပြက္ခဒိန်</strong>
          <small>MYANMAR CALENDAR</small>
        </span>
      </a>

      <div className="calendar-controls">
        <button
          className="nav-icon"
          type="button"
          onClick={() => moveMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <label className="select-label">
          <span className="sr-only">Month</span>
          <select
            value={currentDate.getMonth()}
            onChange={(event) => handleMonthChange(Number(event.target.value))}
          >
            {ENGLISH_MONTHS.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </label>

        <label className="select-label select-label--year">
          <span className="sr-only">Year</span>
          <select
            value={currentDate.getFullYear()}
            onChange={(event) => handleYearChange(Number(event.target.value))}
          >
            {availableYears.map((year) => <option key={year}>{year}</option>)}
          </select>
        </label>

        <button
          className="nav-icon"
          type="button"
          onClick={() => moveMonth(1)}
          disabled={!canGoForward}
          aria-label="Next month"
        >
          <ChevronRight aria-hidden="true" />
        </button>

        <button className="today-button" type="button" onClick={goToToday}>
          <CalendarDays aria-hidden="true" />
          <span>ဒီနေ့</span>
        </button>
      </div>
    </nav>
  );
};
