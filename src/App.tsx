import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MonthNavigation } from './components/MonthNavigation';
import { CalendarGrid } from './components/CalendarGrid';
import { HolidayList } from './components/HolidayList';
import { getAvailableYears, getHolidaysForYear } from './data/holidays';
import { getCurrentTheme } from './utils/theme';

function App() {
  // Get available years dynamically from holiday data
  const availableYears = useMemo(() => getAvailableYears(), []);
  const MIN_YEAR = availableYears[0] || 2024;
  const MAX_YEAR = availableYears[availableYears.length - 1] || 2026;

  const getInitialDate = (): Date => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // If current year is not supported, default to the first supported year
    if (!availableYears.includes(currentYear)) {
      return new Date(MIN_YEAR, 0, 1);
    }
    
    return today;
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());

  // Restrict date to supported years
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

  // Handle year change from header dropdown
  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    // Keep the same month and day, but ensure it's valid for the new year
    const maxDay = new Date(year, newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > maxDay) {
      newDate.setDate(maxDay);
    }
    setCurrentDate(newDate);
  };

  // Get holiday data for the current year
  const currentHolidays = useMemo(() => {
    const year = currentDate.getFullYear();
    const holidayData = getHolidaysForYear(year);
    return holidayData?.holidays || [];
  }, [currentDate]);

  // Convert year to Myanmar numerals
  const toMyanmarNumerals = (year: number): string => {
    const myanmarDigits: Record<string, string> = {
      '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄',
      '5': '၅', '6': '၆', '7': '၇', '8': '၈', '9': '၉'
    };
    return year.toString().split('').map(digit => myanmarDigits[digit] || digit).join('');
  };

  const currentYear = currentDate.getFullYear();
  const myanmarYear = toMyanmarNumerals(currentYear);

  // Get dynamic theme based on current date's month
  const theme = useMemo(() => getCurrentTheme(currentDate), [currentDate]);

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-500 flex flex-col"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header 
        currentDate={currentDate} 
        availableYears={availableYears}
        onYearChange={handleYearChange}
      />
      
      <main className="flex-1 w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 overflow-x-hidden">
        <div className="w-full mx-auto">
        <MonthNavigation 
          currentDate={currentDate} 
          onDateChange={handleDateChange}
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
        />
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
            {/* Calendar Grid - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 w-full">
              <CalendarGrid 
                currentDate={currentDate} 
                holidays={currentHolidays}
              />
            </div>
            
            {/* Holiday Information Sidebar */}
            <div className="lg:col-span-1 w-full">
              <HolidayList 
                currentDate={currentDate} 
                holidays={currentHolidays}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer 
        className="text-white text-center py-4 sm:py-6 mt-6 sm:mt-8 md:mt-12 transition-colors duration-500 w-full"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <p className="text-lg font-medium mb-2">ပြက္ခဒိန် {myanmarYear}</p>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            ရိုးရာယဉ်ကျေးမှုနှင့် ခေတ်မီနည်းပညာပေါင်းစပ်ထားသော ပြက္ခဒိန်
          </p>
          <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {theme.name} Season
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
