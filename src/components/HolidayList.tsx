import React from 'react';
import { Holiday } from '../types/calendar';
import { Calendar, Star } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Next Festival Countdown */}
      {nextFestival && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Star className="h-6 w-6 text-yellow-200" />
            <h3 className="text-xl font-semibold">နောက်လာမည့်ပွဲတော်</h3>
          </div>
          <div className="text-2xl font-bold mb-2">{nextFestival.name}</div>
          <div className="text-lg">
            {nextFestival.daysUntil} ရက်ကျန်ပါသည်
            <span className="block text-sm text-orange-100 mt-1">
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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            {currentMonth} လပွဲတော်များ
          </h3>
        </div>
        
        {monthHolidays.length > 0 ? (
          <div className="space-y-4">
            {monthHolidays.map((holiday, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                <h4 className="font-semibold text-gray-800 text-lg mb-2">
                  {holiday.name}
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {holiday.dates.map((date, dateIndex) => (
                    <span
                      key={dateIndex}
                      className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {date}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  စုစုပေါင်း {holiday.total_days} ရက်
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">ဤလတွင် ပွဲတော်များမရှိပါ။</p>
        )}
      </div>

      {/* Cultural Information */}
      <div className="bg-gradient-to-b from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border border-yellow-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">ယနေ့နေ့စဉ်သတင်းအချက်အလက်</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <span className="text-gray-700">ဥပုသ်နေ့</span>
            <span className="text-blue-600 font-medium">လပြည့်/လကွယ်နေ့</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <span className="text-gray-700">ရက်ရာဇာ</span>
            <span className="text-green-600 font-medium">ကောင်းသောနေ့</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <span className="text-gray-700">မသွားသင့်သောအရပ်</span>
            <span className="text-red-600 font-medium">အနောက်မြောက်</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-orange-100 rounded-lg">
          <p className="text-orange-800 text-sm">
            <strong>ယနေ့အတွက်အကြံပြုချက်:</strong> ကောင်းကျိုးများပြုလုပ်ရန်အကောင်းဆုံးနေ့ဖြစ်သည်။ 
            မေတ္တာစိတ်ဖြင့် သူတပါးအားကူညီပါ။
          </p>
        </div>
      </div>
    </div>
  );
};