import { useMemo, useState } from 'react';
import { CalendarGrid } from './components/CalendarGrid';
import { Header } from './components/Header';
import { HolidayList } from './components/HolidayList';
import { MonthNavigation } from './components/MonthNavigation';
import { getAvailableYears, getHolidaysForYear } from './data/holidays';

function App() {
  const availableYears = useMemo(() => getAvailableYears(), []);

  const getInitialDate = (): Date => {
    const today = new Date();
    return availableYears.includes(today.getFullYear())
      ? today
      : new Date(availableYears.at(-1) ?? 2027, 0, 1);
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate);

  const currentHolidays = useMemo(
    () => getHolidaysForYear(currentDate.getFullYear())?.holidays ?? [],
    [currentDate],
  );

  return (
    <div className="app-canvas">
      <main className="calendar-sheet" aria-label="Myanmar calendar">
        <MonthNavigation
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          availableYears={availableYears}
        />

        <Header currentDate={currentDate} />

        <div className="calendar-workspace">
          <CalendarGrid currentDate={currentDate} holidays={currentHolidays} />
          <HolidayList currentDate={currentDate} />
        </div>

        <footer className="sheet-footer">
          <div className="legend" aria-label="Calendar legend">
            <span><i className="legend-swatch legend-swatch--holiday" /> ရုံးပိတ်ရက်</span>
            <span><i className="legend-swatch legend-swatch--today" /> ယနေ့</span>
            <span><i className="legend-swatch legend-swatch--weekend" /> စနေ / တနင်္ဂနွေ</span>
          </div>
          <p>မြန်မာပြက္ခဒိန် • Myanmar Calendar {currentDate.getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
