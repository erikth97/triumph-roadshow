import { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="grid grid-cols-4 gap-2 w-full text-center">
            <div className="w-full">
                <div className="text-4xl sm:text-5xl font-bold">{timeLeft.days}</div>
                <div className="text-xs sm:text-sm uppercase">Días</div>
            </div>
            <div className="w-full">
                <div className="text-4xl sm:text-5xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs sm:text-sm uppercase">Horas</div>
            </div>
            <div className="w-full">
                <div className="text-4xl sm:text-5xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs sm:text-sm uppercase">Minutos</div>
            </div>
            <div className="w-full">
                <div className="text-4xl sm:text-5xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs sm:text-sm uppercase">Segundos</div>
            </div>
        </div>
    );
};

export default Countdown;