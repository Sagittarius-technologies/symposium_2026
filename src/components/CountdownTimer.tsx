import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="animate-fade-in" role="timer" aria-label="Countdown to event">
      <p className="text-primary-foreground/70 text-sm mb-4 uppercase tracking-wider">Event Starts In</p>
      <div className="flex justify-center gap-3 md:gap-4">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="gradient-secondary flex shrink-0 flex-col items-center justify-center rounded-lg p-2 w-16 h-16 md:w-28 md:h-28 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 active:brightness-90 cursor-pointer select-none"
            onClick={() => {
              // Optional: Add specific click logic here if needed
            }}
          >
            <span className="text-lg md:text-3xl font-bold text-white tabular-nums leading-none">
              {block.value.toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] md:text-xs text-white/90 uppercase tracking-wide mt-1 font-semibold">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
