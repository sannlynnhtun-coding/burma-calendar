import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { getCurrentTheme } from '../utils/theme';

interface HeaderProps {
  currentDate: Date;
  availableYears: number[];
  onYearChange: (year: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, availableYears, onYearChange }) => {
  const theme = getCurrentTheme(currentDate);
  
  const formatMyanmarDate = (date: Date) => {
    const months = [
      'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်',
      'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်',
      'ပြာသို', 'တပေါင်း', 'တပေါင်းလမ်း'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatEnglishDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long'
    });
  };

  const toMyanmarNumerals = (year: number): string => {
    const myanmarDigits: Record<string, string> = {
      '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄',
      '5': '၅', '6': '၆', '7': '၇', '8': '၈', '9': '၉'
    };
    return year.toString().split('').map(digit => myanmarDigits[digit] || digit).join('');
  };

  const currentYear = currentDate.getFullYear();

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    onYearChange(selectedYear);
  };

  return (
    <header 
      className="text-white shadow-lg transition-colors duration-500 w-full"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 w-full sm:w-auto justify-center sm:justify-start">
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" style={{ color: theme.colors.secondary }} />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ပြက္ခဒိန်</h1>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Myanmar Calendar
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 w-full sm:w-auto">
            {/* Year Selector */}
            <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
              <label htmlFor="year-select" className="text-xs sm:text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                နှစ်ရွေးချယ်ရန်
              </label>
              <div className="relative w-full sm:w-auto">
                <select
                  id="year-select"
                  value={currentYear}
                  onChange={handleYearSelect}
                  className="appearance-none bg-white px-3 sm:px-4 py-1.5 sm:py-2 pr-6 sm:pr-8 rounded-lg font-semibold text-sm sm:text-base md:text-lg cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 w-full sm:w-auto"
                  style={{ 
                    color: theme.colors.text
                  } as React.CSSProperties}
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>
                      {year} ({toMyanmarNumerals(year)})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-600 pointer-events-none" />
              </div>
            </div>
            
            {/* Current Date Display */}
            <div className="text-center sm:text-right">
              <div className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ color: theme.colors.secondary }}>
                {formatMyanmarDate(currentDate)}
              </div>
              <div className="text-sm sm:text-base md:text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {formatEnglishDate(currentDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
