import { useState, useEffect } from "react";
import { days } from "../util/dateTime";

const Clock = () => {
  const [time, setTime] = useState<string>(getTime(new Date()));

  useEffect(() => {
    let clock = setInterval(() => {
      setTime(getTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  return <p className="font-[Kubasta] text-ctp-text 2xl:text-2xl">{time}</p>;
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
    String(d.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(d.getDate()).padStart(2, "0") +
    "/" +
    d.getFullYear() +
    " " +
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0") +
    ":" +
    String(d.getSeconds()).padStart(2, "0")
  );
};
