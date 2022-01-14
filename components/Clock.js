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
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getDate()).slice(-2) +
      "/" +
      d.getFullYear() +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ":" +
      ("0" + d.getSeconds()).slice(-2)
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
