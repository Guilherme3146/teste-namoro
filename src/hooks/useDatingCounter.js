import { useState, useEffect } from 'react';

export function useDatingCounter(startDateStr) {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, minutes: 0 });

  useEffect(() => {
    const startDate = new Date(startDateStr);

    const updateCounter = () => {
      const now = new Date();
      // Valores totais absolutos
      const diffInMs = now.getTime() - startDate.getTime();
      
      const totalMinutes = Math.floor(diffInMs / (1000 * 60));
      const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      // Meses aproximados ou exatos (3 anos = 36 meses, etc)
      let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      if (now.getDate() < startDate.getDate()) {
        totalMonths--;
      }

      setTime({ 
        months: totalMonths, 
        days: totalDays, 
        hours: totalHours, 
        minutes: totalMinutes 
      });
    };

    updateCounter(); // Chamada inicial
    const interval = setInterval(updateCounter, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, [startDateStr]);

  return time;
}
