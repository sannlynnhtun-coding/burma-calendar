import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({ 
  currentDate, 
  onDateChange 
}) => {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>ရှေ့လ</span>
        </button>
        
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">{monthNames.myanmar}</div>
          <div className="text-sm text-gray-600">{monthNames.english}</div>
        </div>
        
        <button
          onClick={() => navigateMonth('next')}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <span>နောက်လ</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex justify-center mt-4">
        <button
          onClick={goToToday}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
        >
          ဒီနေ့သို့ပြန်သွား
        </button>
      </div>
    </div>
  );
};