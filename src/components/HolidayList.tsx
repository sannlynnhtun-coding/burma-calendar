import React from 'react';
import { Holiday } from '../types/calendar';
import { Calendar, Star, Info, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Next Festival Countdown */}
      {nextFestival && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden p-6 border-2 border-primary/20 bg-primary/5 shadow-none group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="h-20 w-20 rotate-12" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-primary animate-bounce" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">နောက်လာမည့်ပွဲတော်</h3>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black">{nextFestival.name}</h2>
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {nextFestival.daysUntil} ရက်ကျန်ပါသည်
                </div>
              </div>

              <div className="pt-2 text-xs font-bold text-muted-foreground/60 border-t border-primary/10">
                {nextFestival.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Current Month Holidays */}
      <Card className="p-6 border-2 rounded-2xl bg-card">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold">{currentMonth} ပွဲတော်များ</h3>
        </div>

        {monthHolidays.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {monthHolidays.map((holiday, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative pl-5 py-3 rounded-xl hover:bg-secondary/30 transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full" />
                <h4 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                  {holiday.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {holiday.dates.map((date, dateIndex) => (
                    <Badge key={dateIndex} variant="secondary" className="font-bold border-2">
                      {date}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 space-y-2 opacity-50">
            <Info className="h-10 w-10 mx-auto" />
            <p className="text-sm font-bold italic">ဤလတွင် ပွဲတော်များမရှိပါ။</p>
          </div>
        )}
      </Card>

      {/* Cultural Info Card */}
      <Card className="p-6 border-2 border-dashed rounded-2xl bg-secondary/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          ယနေ့သတင်းအချက်အလက်
        </h3>

        <div className="space-y-3">
          {[
            { label: 'ဥပုသ်နေ့', value: 'လပြည့်/လကွယ်နေ့', highlight: 'text-primary' },
            { label: 'ရက်ရာဇာ', value: 'ကောင်းသောနေ့', highlight: 'text-amber-600' },
            { label: 'မသွားသင့်သောအရပ်', value: 'အနောက်မြောက်', highlight: 'text-destructive' }
          ].map((info, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm font-bold text-muted-foreground">{info.label}</span>
              <span className={cn("text-sm font-black", info.highlight)}>{info.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};