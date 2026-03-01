import React from 'react';
import { DayInfo, Holiday } from '../types/calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

interface CalendarGridProps {
  currentDate: Date;
  holidays: Holiday[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, holidays }) => {
  const { theme: mode } = useTheme();

  const getDaysInMonth = (date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    const monthName = firstDay.toLocaleDateString('en-US', { month: 'long' });
    const monthHolidays = holidays.filter(h => h.month === monthName);

    const days: DayInfo[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ day: 0, isHoliday: false, isToday: false, isWeekend: false });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayDate = new Date(year, month, day);
      const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;
      const isToday = dayDate.toDateString() === today.toDateString();

      let isHoliday = false;
      let holidayName = '';

      for (const holiday of monthHolidays) {
        if (holiday.dates.includes(day.toString())) {
          isHoliday = true;
          holidayName = holiday.name;
          break;
        }
      }

      days.push({ day, isHoliday, holidayName, isToday, isWeekend });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysMm = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];

  return (
    <Card className="p-4 sm:p-6 border-2 rounded-2xl shadow-sm transition-all duration-500 overflow-hidden bg-card">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className="text-center p-2 rounded-xl bg-secondary/50"
          >
            <div className="font-bold text-xs sm:text-sm text-primary">{day}</div>
            <div className="text-[10px] hidden md:block font-medium opacity-60">{weekDaysMm[index]}</div>
          </div>
        ))}
      </div>

      <motion.div
        key={currentDate.toISOString()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-7 gap-2"
      >
        <AnimatePresence mode="popLayout">
          {days.map((dayInfo, index) => {
            if (dayInfo.day === 0) return <div key={`empty-${index}`} />;

            const isToday = dayInfo.isToday;
            const isHoliday = dayInfo.isHoliday;
            const isWeekend = dayInfo.isWeekend && !isHoliday;

            return (
              <motion.div
                key={`${currentDate.getMonth()}-${dayInfo.day}`}
                layout
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={cn(
                  "relative aspect-square sm:aspect-auto sm:min-h-[80px] p-2 rounded-xl border-2 transition-all cursor-default flex flex-col items-center sm:items-start justify-center sm:justify-start",
                  isToday && "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20",
                  isHoliday && !isToday && "bg-secondary/80 border-secondary text-secondary-foreground font-bold",
                  isWeekend && !isToday && !isHoliday && "bg-background border-muted text-muted-foreground opacity-70",
                  !isToday && !isHoliday && !isWeekend && "bg-background border-border hover:border-primary/30"
                )}
              >
                <span className="text-sm sm:text-xl font-bold">
                  {dayInfo.day}
                </span>

                {isHoliday && (
                  <div className="hidden sm:block mt-1 text-[9px] leading-tight font-bold uppercase tracking-tighter opacity-80">
                    {dayInfo.holidayName}
                  </div>
                )}

                {isToday && (
                  <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                )}

                {isHoliday && !isToday && (
                  <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};