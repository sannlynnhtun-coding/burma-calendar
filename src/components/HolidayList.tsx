import React from 'react';
import { Holiday } from '../types/calendar';
import { ENGLISH_MONTHS, toMyanmarNumerals } from '../utils/calendar';

interface HolidayListProps {
  currentDate: Date;
  holidays: Holiday[];
}

export const HolidayList: React.FC<HolidayListProps> = ({ currentDate, holidays }) => {
  const currentMonth = ENGLISH_MONTHS[currentDate.getMonth()];
  const monthHolidays = holidays.filter((holiday) => holiday.month === currentMonth);
  const holidayDayCount = new Set(monthHolidays.flatMap((holiday) => holiday.dates)).size;

  return (
    <section className="holiday-docket" aria-labelledby="holiday-heading">
      <div className="docket-heading">
        <div>
          <span className="docket-kicker">OFFICIAL DATES · ရုံးပိတ်ရက်များ</span>
          <h2 id="holiday-heading">{currentMonth} အားလပ်ရက်စာရင်း</h2>
        </div>
        <div className="docket-count" aria-label={`${holidayDayCount} holiday days`}>
          <strong>{toMyanmarNumerals(holidayDayCount)}</strong>
          <span>ရက်</span>
        </div>
      </div>

      {monthHolidays.length > 0 ? (
        <div className="holiday-list">
          {monthHolidays.map((holiday, index) => (
            <article className="holiday-entry" key={`${holiday.name}-${holiday.dates.join('-')}-${index}`}>
              <div className="holiday-dates" aria-label={`Dates ${holiday.dates.join(', ')}`}>
                {holiday.dates.map((date) => <strong key={date}>{date}</strong>)}
              </div>
              <div className="holiday-copy">
                <h3>{holiday.name}</h3>
                {holiday.nameEn && <p>{holiday.nameEn}</p>}
              </div>
              {holiday.type && (
                <span className={`holiday-type ${holiday.type.includes('Bridge') ? 'holiday-type--bridge' : ''}`}>
                  {holiday.type}
                </span>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="holiday-empty">ဤလတွင် သတ်မှတ်ထားသော ရုံးပိတ်ရက် မရှိပါ။</p>
      )}
    </section>
  );
};
