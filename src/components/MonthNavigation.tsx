import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

  const handleMonthSelect = (value: string) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(value, 10));
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const year = today.getFullYear();

    if (year < minYear || year > maxYear) {
      onDateChange(new Date(minYear, 0, 1));
    } else {
      onDateChange(today);
    }
  };

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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const myanmarMonths = [
    'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း',
    'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို', 'တပေါင်း', 'တပေါင်းလမ်း'
  ];

  const currentMonthIdx = currentDate.getMonth();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border-2 p-4 sm:p-5 rounded-2xl shadow-sm transition-all duration-500">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('prev')}
          disabled={!canGoPrev()}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl transition-all active:scale-90 border-2"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        <Select value={currentMonthIdx.toString()} onValueChange={handleMonthSelect}>
          <SelectTrigger className="h-10 sm:h-12 flex-1 sm:w-[220px] rounded-xl font-bold text-base sm:text-lg border-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            {months.map((month, idx) => (
              <SelectItem key={month} value={idx.toString()} className="font-bold py-2.5">
                {month} ({myanmarMonths[idx]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('next')}
          disabled={!canGoNext()}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl transition-all active:scale-90 border-2"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      <Button
        onClick={goToToday}
        variant="secondary"
        className="w-full sm:w-auto h-10 sm:h-12 px-6 rounded-xl font-bold text-base bg-secondary transition-all hover:scale-105 active:scale-95 border-2 shadow-sm"
      >
        <CalendarDays className="h-5 w-5 mr-2 opacity-70" />
        ဒီနေ့သို့
      </Button>
    </div>
  );
};