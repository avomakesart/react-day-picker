import React, { useState } from 'react';
import { DayPicker, MonthChangeEventHandler } from 'react-day-picker';

import { addMonths, isSameMonth, isToday } from 'date-fns';

const today = new Date();
const nextMonth = addMonths(new Date(), 1);

export default function App() {
  const [month, setMonth] = useState<Date>(nextMonth);

  const footer = (
    <button
      disabled={isSameMonth(today, month)}
      onClick={() => setMonth(today)}
    >
      Go to Today
    </button>
  );

  return <DayPicker month={month} onMonthChange={setMonth} footer={footer} />;
}
