import { useState, useEffect } from "react";
import { days } from "../util/dateTime";

const Clock = () => {
  const [time, setTime] = useState<string>(getTime(new Date()));
  // prevents React hydration error with clock text mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    let clock = setInterval(() => {
      setTime(getTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <p className="font-[Kubasta] text-ctp-text 2xl:text-2xl">
      {isClient && time}
    </p>
  );
};

export default Clock;

/**
 * Get current time through js Date object
 * @returns string that represents the time in "DAY MM/DD/YYYY HOURS:MINUTES:SECONDS"
 */
const getTime = (d: Date): string => {
  return (
    days[d.getDay()] +
    " " +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    d.getDate().toString().padStart(2, "0") +
    "/" +
    d.getFullYear() +
    " " +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0") +
    ":" +
    d.getSeconds().toString().padStart(2, "0")
  );
};
