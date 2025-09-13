import React from 'react';
import { DayInfo, Holiday } from '../types/calendar';

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, index) => (
          <div key={day} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{day}</div>
            <div className="text-sm text-gray-500">{weekDaysMm[index]}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayInfo, index) => (
          <div
            key={index}
            className={`
              relative min-h-[60px] p-2 rounded-lg border transition-all duration-200 hover:shadow-md
              ${dayInfo.day === 0 ? 'invisible' : ''}
              ${dayInfo.isToday ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300' : ''}
              ${dayInfo.isHoliday ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'}
              ${dayInfo.isWeekend && !dayInfo.isHoliday ? 'bg-blue-50 border-blue-200' : ''}
            `}
          >
            {dayInfo.day > 0 && (
              <>
                <div className={`
                  text-lg font-semibold
                  ${dayInfo.isToday ? 'text-yellow-800' : ''}
                  ${dayInfo.isHoliday ? 'text-red-700' : ''}
                  ${dayInfo.isWeekend && !dayInfo.isHoliday ? 'text-blue-700' : 'text-gray-800'}
                `}>
                  {dayInfo.day}
                </div>
                
                {dayInfo.isHoliday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
                
                {dayInfo.isToday && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
                    ဒီနေ့
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};