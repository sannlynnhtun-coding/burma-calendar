import React, { useMemo } from 'react';
import { getHolidaysForYear } from '../data/holidays';
import { Holiday } from '../types/calendar';
import { ENGLISH_MONTHS, MYANMAR_MONTH_PAIRS, toMyanmarNumerals } from '../utils/calendar';

interface HolidayListProps {
  currentDate: Date;
}

interface MonthHolidayGroup {
  date: Date;
  holidays: Holiday[];
  hasYearData: boolean;
}

export const HolidayList: React.FC<HolidayListProps> = ({ currentDate }) => {
  const monthGroups = useMemo<MonthHolidayGroup[]>(() => (
    Array.from({ length: 3 }, (_, offset) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
      const yearData = getHolidaysForYear(date.getFullYear());
      const monthName = ENGLISH_MONTHS[date.getMonth()];

      return {
        date,
        holidays: yearData?.holidays.filter((holiday) => holiday.month === monthName) ?? [],
        hasYearData: Boolean(yearData),
      };
    })
  ), [currentDate]);

  const visibleHolidayDays = new Set(
    monthGroups.flatMap((group) => (
      group.holidays.flatMap((holiday) => (
        holiday.dates.map((day) => `${group.date.getFullYear()}-${group.date.getMonth()}-${day}`)
      ))
    )),
  ).size;

  return (
    <aside className="holiday-sidebar" aria-labelledby="holiday-heading">
      <header className="holiday-sidebar-heading">
        <div>
          <span className="sidebar-kicker">CURRENT + NEXT 2 MONTHS</span>
          <h2 id="holiday-heading">၃ လတာ အားလပ်ရက်</h2>
        </div>
        <div className="sidebar-total" aria-label={`${visibleHolidayDays} holiday days`}>
          <strong>{toMyanmarNumerals(visibleHolidayDays)}</strong>
          <span>ရက်</span>
        </div>
      </header>

      <div className="holiday-months">
        {monthGroups.map((group, groupIndex) => {
          const monthIndex = group.date.getMonth();
          const monthName = ENGLISH_MONTHS[monthIndex];

          return (
            <section className="holiday-month" key={`${group.date.getFullYear()}-${monthIndex}`}>
              <header className="holiday-month-heading">
                <span className="holiday-month-number">{String(monthIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{monthName} <small>{group.date.getFullYear()}</small></h3>
                  <p>{MYANMAR_MONTH_PAIRS[monthIndex]}</p>
                </div>
                {groupIndex === 0 && <span className="current-month-label">ယခုလ</span>}
              </header>

              {group.holidays.length > 0 ? (
                <ul className="sidebar-holiday-list">
                  {group.holidays.map((holiday, index) => (
                    <li key={`${holiday.name}-${holiday.dates.join('-')}-${index}`}>
                      <span className="sidebar-holiday-date">{holiday.dates.join('·')}</span>
                      <span className="sidebar-holiday-name" title={holiday.nameEn ?? holiday.name}>
                        {holiday.name}
                      </span>
                      <i
                        className={`sidebar-holiday-mark ${holiday.type?.includes('Bridge') ? 'sidebar-holiday-mark--bridge' : ''}`}
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="sidebar-holiday-empty">
                  {group.hasYearData ? 'ရုံးပိတ်ရက် မရှိပါ' : 'အချက်အလက် မရရှိသေးပါ'}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
};
