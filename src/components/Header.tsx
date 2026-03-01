import React from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  currentDate: Date;
  availableYears: number[];
  onYearChange: (year: number) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  availableYears,
  onYearChange,
  isDarkMode,
  onToggleDarkMode
}) => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b glass transition-all duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 transition-transform hover:rotate-3">
              <img src="/logo.svg" alt="Myanmar Calendar Logo" className="h-10 w-10 sm:h-12 sm:w-12 pointer-events-none" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">ပြက္ခဒိန်</h1>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Myanmar Calendar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="h-10 sm:h-12 px-3 sm:px-5 font-bold text-sm sm:text-base gap-2 rounded-xl border-2 hover:bg-secondary">
                  {currentDate.getFullYear()} ({toMyanmarNumerals(currentDate.getFullYear())})
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl border-2">
                {availableYears.map(year => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => onYearChange(year)}
                    className="rounded-lg font-bold py-2.5"
                  >
                    {year} ({toMyanmarNumerals(year)})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-secondary/50 hover:bg-secondary transition-all active:scale-95"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
              )}
            </Button>

            <div className="hidden md:block text-right border-l-2 pl-6 py-1">
              <div className="text-xl font-bold text-primary">
                {formatMyanmarDate(currentDate)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {formatEnglishDate(currentDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
