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
            className="flex flex-col items-center bg-orange-500 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] border border-primary-foreground/20"
          >
            <span className="text-2xl md:text-4xl font-bold text-primary-foreground tabular-nums">
              {block.value.toString().padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm text-primary-foreground/70 uppercase tracking-wide mt-1">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
