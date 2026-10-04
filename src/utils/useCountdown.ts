import { useState, useEffect } from 'react';
import { PROMO_EXPIRY_MS } from '../../lib/pricing';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

export function useCountdown(targetTimestamp: number = PROMO_EXPIRY_MS): CountdownState {
  const calculate = (): CountdownState => {
    const now = Date.now();
    const diff = targetTimestamp - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        formatted: 'Offer Expired',
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      formatted: `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`,
    };
  };

  const [state, setState] = useState<CountdownState>(calculate);

  useEffect(() => {
    // Run immediately
    setState(calculate());

    const interval = setInterval(() => {
      const next = calculate();
      setState(next);
      if (next.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return state;
}
