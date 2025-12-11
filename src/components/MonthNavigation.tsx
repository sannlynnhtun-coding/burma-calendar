import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCurrentTheme } from '../utils/theme';

interface MonthNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  minYear: number;
  maxYear: number;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({ 
  currentDate, 
  onDateChange,
  minYear,
  maxYear
}) => {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    // Restrict to supported years
    const year = newDate.getFullYear();
    if (year < minYear) {
      newDate.setFullYear(minYear);
      newDate.setMonth(0);
      newDate.setDate(1);
    } else if (year > maxYear) {
      newDate.setFullYear(maxYear);
      newDate.setMonth(11);
      newDate.setDate(31);
    }
    
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    
    // If today is not in supported years, go to the first supported year
    if (year < minYear || year > maxYear) {
      onDateChange(new Date(minYear, 0, 1));
    } else {
      onDateChange(today);
    }
  };

  // Check if navigation buttons should be disabled
  const canGoPrev = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return !(year === minYear && month === 0);
  };

  const canGoNext = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return !(year === maxYear && month === 11);
  };

  const formatCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const myanmarMonths = [
      'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း',
      'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို', 'တပေါင်း', 'တပေါင်းလမ်း'
    ];
    
    const monthIndex = currentDate.getMonth();
    return {
      english: `${months[monthIndex]} ${currentDate.getFullYear()}`,
      myanmar: `${myanmarMonths[monthIndex]} ${currentDate.getFullYear()}`
    };
  };

  const monthNames = formatCurrentMonth();
  const theme = getCurrentTheme(currentDate);

  return (
    <div 
      className="rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <button
          onClick={() => navigateMonth('prev')}
          disabled={!canGoPrev()}
          className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base ${
            canGoPrev() 
              ? 'text-white hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={canGoPrev() ? { backgroundColor: theme.colors.primary } : {}}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">ရှေ့လ</span>
        </button>
        
        <div className="text-center flex-1 px-2">
          <div className="text-base sm:text-lg md:text-xl font-bold" style={{ color: theme.colors.text }}>
            {monthNames.myanmar}
          </div>
          <div className="text-xs sm:text-sm" style={{ color: theme.colors.text, opacity: 0.7 }}>
            {monthNames.english}
          </div>
        </div>
        
        <button
          onClick={() => navigateMonth('next')}
          disabled={!canGoNext()}
          className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base ${
            canGoNext() 
              ? 'text-white hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={canGoNext() ? { backgroundColor: theme.colors.primary } : {}}
        >
          <span className="hidden sm:inline">နောက်လ</span>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
      
      <div className="flex justify-center mt-3 sm:mt-4">
        <button
          onClick={goToToday}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-xs sm:text-sm md:text-base"
          style={{ backgroundColor: theme.colors.secondary }}
        >
          ဒီနေ့သို့ပြန်သွား
        </button>
      </div>
    </div>
  );
};