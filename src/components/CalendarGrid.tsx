import React from 'react';
import { DayInfo, Holiday } from '../types/calendar';
import { getCurrentTheme } from '../utils/theme';

interface CalendarGridProps {
  currentDate: Date;
  holidays: Holiday[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, holidays }) => {
  const getDaysInMonth = (date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    const monthName = firstDay.toLocaleDateString('en-US', { month: 'long' });
    const monthHolidays = holidays.filter(h => h.month === monthName);
    
    const days: DayInfo[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({
        day: 0,
        isHoliday: false,
        isToday: false,
        isWeekend: false
      });
    }
    
    // Add all days of the month
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
      
      days.push({
        day,
        isHoliday,
        holidayName,
        isToday,
        isWeekend
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysMm = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
  const theme = getCurrentTheme(currentDate);

  return (
    <div 
      className="rounded-xl shadow-lg p-3 sm:p-4 md:p-6 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
        {weekDays.map((day, index) => (
          <div 
            key={day} 
            className="text-center p-1 sm:p-2 md:p-3 rounded-lg"
            style={{ backgroundColor: theme.colors.secondary, color: '#FFFFFF' }}
          >
            <div className="font-semibold text-xs sm:text-sm md:text-base">{day}</div>
            <div className="text-xs hidden sm:block">{weekDaysMm[index]}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((dayInfo, index) => {
          const isToday = dayInfo.isToday;
          const isHoliday = dayInfo.isHoliday;
          const isWeekend = dayInfo.isWeekend && !isHoliday;
          
          let cellStyle: React.CSSProperties = {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.secondary,
            borderWidth: '1px',
            borderStyle: 'solid',
          };
          
          if (isToday) {
            cellStyle.backgroundColor = theme.colors.primary;
            cellStyle.color = '#FFFFFF';
            cellStyle.borderColor = theme.colors.primary;
          } else if (isHoliday) {
            cellStyle.backgroundColor = theme.colors.secondary;
            cellStyle.color = '#FFFFFF';
            cellStyle.opacity = 0.9;
          } else if (isWeekend) {
            cellStyle.backgroundColor = theme.colors.background;
            cellStyle.opacity = 0.7;
          }
          
          return (
            <div
              key={index}
              className={`
                relative min-h-[40px] sm:min-h-[50px] md:min-h-[60px] p-1 sm:p-2 rounded-lg transition-all duration-200 hover:shadow-md
                ${dayInfo.day === 0 ? 'invisible' : ''}
              `}
              style={cellStyle}
            >
              {dayInfo.day > 0 && (
                <>
                  <div 
                    className="text-sm sm:text-base md:text-lg font-semibold"
                    style={{ 
                      color: isToday ? '#FFFFFF' : isHoliday ? '#FFFFFF' : theme.colors.text 
                    }}
                  >
                    {dayInfo.day}
                  </div>
                  
                  {isHoliday && !isToday && (
                    <div 
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                  )}
                  
                  {isToday && (
                    <div 
                      className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: theme.colors.secondary }}
                    >
                      ဒီနေ့
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};