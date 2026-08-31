import React from 'react';
import {
  ENGLISH_MONTHS,
  getMyanmarEraLabel,
  MYANMAR_MONTH_PAIRS,
} from '../utils/calendar';

interface HeaderProps {
  currentDate: Date;
}

export const Header: React.FC<HeaderProps> = ({ currentDate }) => {
  const monthIndex = currentDate.getMonth();
  const year = String(currentDate.getFullYear());

  return (
    <header className="calendar-masthead">
      <div className="masthead-myanmar">
        <p className="masthead-kicker">မြန်မာသက္ကရာဇ်</p>
        <h1>သက္ကရာဇ်-{getMyanmarEraLabel(currentDate)} ခု၊</h1>
        <p>{MYANMAR_MONTH_PAIRS[monthIndex]}</p>
      </div>

      <div className="masthead-month-number" aria-hidden="true">
        {monthIndex + 1}
      </div>

      <div className="masthead-english">
        <span className="masthead-month-name">{ENGLISH_MONTHS[monthIndex]}</span>
        <span className="masthead-year" aria-label={year}>
          <span>{year.slice(0, 2)}</span>
          <span>{year.slice(2)}</span>
        </span>
      </div>
    </header>
  );
};
