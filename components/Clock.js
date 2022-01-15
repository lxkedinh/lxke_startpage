import { StyledClock } from "./styles/Clock.styled";
import { useState, useEffect } from "react";

const Clock = () => {
  /**
   * Get current time through js Date object
   * @returns string that represents the time in "DAY MM/DD/YYYY HOURS:MINUTES:SECONDS"
   */
  const getTime = () => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    let d = new Date();

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

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
  }, []);

  return <StyledClock>{time}</StyledClock>;
};

export default Clock;
