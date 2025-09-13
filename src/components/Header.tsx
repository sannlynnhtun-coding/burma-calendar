import React from 'react';
import { Calendar, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  currentDate: Date;
}

export const Header: React.FC<HeaderProps> = ({ currentDate }) => {
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

  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-orange-600 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-yellow-300" />
            <div>
              <h1 className="text-3xl font-bold">မြန်မာပြက္ခဒိန်</h1>
              <p className="text-red-100 text-lg">Myanmar Calendar 2026</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-yellow-200">
              {formatMyanmarDate(currentDate)}
            </div>
            <div className="text-lg text-red-100">
              {formatEnglishDate(currentDate)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};