import React, { useState, useEffect } from "react";
import './Time.css';

const Time: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    setCurrentTime(timeString);

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, dateOptions);
    setCurrentDate(dateString);
  }

  return (
    <div className="time-card bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300">
      <span className="time-span">{currentTime}</span>
      <span>{currentDate}</span>
    </div>
  );
}

export default Time;
