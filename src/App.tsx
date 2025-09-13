import React, { useState } from 'react';
import { Header } from './components/Header';
import { MonthNavigation } from './components/MonthNavigation';
import { CalendarGrid } from './components/CalendarGrid';
import { HolidayList } from './components/HolidayList';
import { myanmarHolidays2026 } from './data/holidays';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <Header currentDate={currentDate} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MonthNavigation 
          currentDate={currentDate} 
          onDateChange={setCurrentDate}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CalendarGrid 
              currentDate={currentDate} 
              holidays={myanmarHolidays2026.holidays}
            />
          </div>
          
          {/* Holiday Information Sidebar */}
          <div className="lg:col-span-1">
            <HolidayList 
              currentDate={currentDate} 
              holidays={myanmarHolidays2026.holidays}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-lg font-medium mb-2">မြန်မာပြက္ခဒိန် ၂၀၂၆</p>
          <p className="text-gray-400">
            ရိုးရာယဉ်ကျေးမှုနှင့် ခေတ်မီနည်းပညာပေါင်းစပ်ထားသော ပြက္ခဒိန်
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;