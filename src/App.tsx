import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { MonthNavigation } from './components/MonthNavigation';
import { CalendarGrid } from './components/CalendarGrid';
import { HolidayList } from './components/HolidayList';
import { getAvailableYears, getHolidaysForYear } from './data/holidays';
import { getCurrentTheme, applyTheme } from './utils/theme';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const availableYears = useMemo(() => getAvailableYears(), []);
  const MIN_YEAR = availableYears[0] || 2024;
  const MAX_YEAR = availableYears[availableYears.length - 1] || 2026;

  const getInitialDate = (): Date => {
    const today = new Date();
    const currentYear = today.getFullYear();
    if (!availableYears.includes(currentYear)) {
      return new Date(MIN_YEAR, 0, 1);
    }
    return today;
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleDateChange = (date: Date) => {
    const year = date.getFullYear();
    if (availableYears.includes(year)) {
      setCurrentDate(date);
    } else if (year < MIN_YEAR) {
      setCurrentDate(new Date(MIN_YEAR, 0, 1));
    } else if (year > MAX_YEAR) {
      setCurrentDate(new Date(MAX_YEAR, 11, 31));
    }
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    const maxDay = new Date(year, newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > maxDay) {
      newDate.setDate(maxDay);
    }
    setCurrentDate(newDate);
  };

  const currentHolidays = useMemo(() => {
    const year = currentDate.getFullYear();
    const holidayData = getHolidaysForYear(year);
    return holidayData?.holidays || [];
  }, [currentDate]);

  const theme = useMemo(() => getCurrentTheme(currentDate), [currentDate]);

  useEffect(() => {
    applyTheme(theme, isDarkMode);
  }, [theme, isDarkMode]);

  return (
    <ThemeProvider defaultTheme={isDarkMode ? 'dark' : 'light'} storageKey="vite-ui-theme">
      <div
        className="min-h-screen w-full transition-all duration-500 flex flex-col bg-background text-foreground"
      >
        <Header
          currentDate={currentDate}
          availableYears={availableYears}
          onYearChange={handleYearChange}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="flex-1 w-full px-2 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-10">
          <div className="max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
            <MonthNavigation
              currentDate={currentDate}
              onDateChange={handleDateChange}
              minYear={MIN_YEAR}
              maxYear={MAX_YEAR}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                <CalendarGrid
                  currentDate={currentDate}
                  holidays={currentHolidays}
                />
              </div>

              <div className="lg:col-span-1">
                <HolidayList
                  currentDate={currentDate}
                  holidays={currentHolidays}
                />
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full border-t bg-card py-8 mt-auto">
          <div className="max-w-[1400px] mx-auto px-4 text-center space-y-2">
            <p className="text-xl font-bold tracking-tight">ပြက္ခဒိန် {currentDate.getFullYear()}</p>
            <p className="text-muted-foreground text-sm font-medium">
              ရိုးရာယဉ်ကျေးမှုနှင့် ခေတ်မီနည်းပညာပေါင်းစပ်ထားသော ပြက္ခဒိန်
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {theme.name} Season
              </span>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
