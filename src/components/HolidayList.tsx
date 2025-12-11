import React from 'react';
import { Holiday } from '../types/calendar';
import { Calendar, Star } from 'lucide-react';
import { getCurrentTheme } from '../utils/theme';

interface HolidayListProps {
  currentDate: Date;
  holidays: Holiday[];
}

export const HolidayList: React.FC<HolidayListProps> = ({ currentDate, holidays }) => {
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const monthHolidays = holidays.filter(h => h.month === currentMonth);

  const getNextFestival = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    for (let monthOffset = 0; monthOffset <= 12; monthOffset++) {
      const checkDate = new Date(currentYear, now.getMonth() + monthOffset, 1);
      const checkMonth = checkDate.toLocaleDateString('en-US', { month: 'long' });
      const monthHols = holidays.filter(h => h.month === checkMonth);
      
      for (const holiday of monthHols) {
        for (const date of holiday.dates) {
          const holidayDate = new Date(currentYear, checkDate.getMonth(), parseInt(date));
          if (holidayDate > now) {
            const daysUntil = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return { name: holiday.name, daysUntil, date: holidayDate };
          }
        }
      }
    }
    return null;
  };

  const nextFestival = getNextFestival();
  const theme = getCurrentTheme(currentDate);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Next Festival Countdown */}
      {nextFestival && (
        <div 
          className="text-white p-4 sm:p-6 rounded-xl shadow-lg transition-colors duration-500"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
            <Star className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: theme.colors.secondary }} />
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">နောက်လာမည့်ပွဲတော်</h3>
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{nextFestival.name}</div>
          <div className="text-sm sm:text-base md:text-lg">
            {nextFestival.daysUntil} ရက်ကျန်ပါသည်
            <span className="block text-xs sm:text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {nextFestival.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      )}

      {/* Current Month Holidays */}
      <div 
        className="rounded-xl shadow-lg p-4 sm:p-6 transition-colors duration-500"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <Calendar className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: theme.colors.primary }} />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold" style={{ color: theme.colors.text }}>
            {currentMonth} လပွဲတော်များ
          </h3>
        </div>
        
        {monthHolidays.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {monthHolidays.map((holiday, index) => (
              <div 
                key={index} 
                className="pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-lg transition-colors duration-500"
                style={{ 
                  borderLeftWidth: '4px',
                  borderLeftStyle: 'solid',
                  borderLeftColor: theme.colors.primary,
                  backgroundColor: theme.colors.background,
                  opacity: 0.95
                }}
              >
                <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2" style={{ color: theme.colors.text }}>
                  {holiday.name}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {holiday.dates.map((date, dateIndex) => (
                    <span
                      key={dateIndex}
                      className="inline-block text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                      style={{ backgroundColor: theme.colors.secondary }}
                    >
                      {date}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm" style={{ color: theme.colors.text, opacity: 0.7 }}>
                  စုစုပေါင်း {holiday.total_days} ရက်
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm sm:text-base italic" style={{ color: theme.colors.text, opacity: 0.6 }}>
            ဤလတွင် ပွဲတော်များမရှိပါ။
          </p>
        )}
      </div>

      {/* Cultural Information */}
      <div 
        className="rounded-xl shadow-lg p-4 sm:p-6 transition-colors duration-500"
        style={{ 
          backgroundColor: theme.colors.background,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: theme.colors.secondary
        }}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4" style={{ color: theme.colors.text }}>
          ယနေ့နေ့စဉ်သတင်းအချက်အလက်
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          <div 
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg shadow-sm"
            style={{ backgroundColor: theme.colors.background }}
          >
            <span style={{ color: theme.colors.text }}>ဥပုသ်နေ့</span>
            <span className="font-medium" style={{ color: theme.colors.primary }}>လပြည့်/လကွယ်နေ့</span>
          </div>
          
          <div 
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg shadow-sm"
            style={{ backgroundColor: theme.colors.background }}
          >
            <span style={{ color: theme.colors.text }}>ရက်ရာဇာ</span>
            <span className="font-medium" style={{ color: theme.colors.secondary }}>ကောင်းသောနေ့</span>
          </div>
          
          <div 
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg shadow-sm"
            style={{ backgroundColor: theme.colors.background }}
          >
            <span style={{ color: theme.colors.text }}>မသွားသင့်သောအရပ်</span>
            <span className="font-medium" style={{ color: theme.colors.primary }}>အနောက်မြောက်</span>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg" style={{ backgroundColor: theme.colors.secondary, opacity: 0.2 }}>
          <p className="text-xs sm:text-sm" style={{ color: theme.colors.text }}>
            <strong>ယနေ့အတွက်အကြံပြုချက်:</strong> ကောင်းကျိုးများပြုလုပ်ရန်အကောင်းဆုံးနေ့ဖြစ်သည်။ 
            မေတ္တာစိတ်ဖြင့် သူတပါးအားကူညီပါ။
          </p>
        </div>
      </div>
    </div>
  );
};