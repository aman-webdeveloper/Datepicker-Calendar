import { useState } from "react";
import "./Datepicker.css";

export default function Datepicker() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [error, setError] = useState("");



  const today = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1, 
        1
      )
    );
  };

 // Month ke total din nikalna (28–31)
const daysInMonth = new Date(
  currentDate.getFullYear(),     // current year
  currentDate.getMonth() + 1,    // next month
  0                              // previous month ka last day
).getDate();                     // us din ki date = total days


// Month ki first date ka weekday nikalna
const firstDayOfMonth = new Date(
  currentDate.getFullYear(),     // current year
  currentDate.getMonth(),        // current month
  1                              // month ki first date
).getDay();                      // 0–6 (Sun–Sat)


// Calendar alignment ke liye blank boxes
const blanks = Array.from(
  { length: firstDayOfMonth }    // jitne weekday se start ho
);

// 1 se last day tak dates ka array
const daysArray = Array.from(
  { length: daysInMonth },       // total days
  (_, i) => i + 1                // 1,2,3...daysInMonth
);

// Manual input handle karne ka function
const handleManualInput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  // sirf numbers allow

  if (value.length > 2 && value.length <= 4) {
    value = value.slice(0, 2) + "/" + value.slice(2);
    // DD ke baad "/"
  } 
  else if (value.length > 4) {
    value =
      value.slice(0, 2) + "/" +
      value.slice(2, 4) + "/" +
      value.slice(4, 8);
    // DD/MM/YYYY format
  }

  setSelectedDate(value);        // input me value set

  const parts = value.split("/");

  if (parts.length === 3) {
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);

    if (
      day >= 1 && day <= 31 &&
      month >= 1 && month <= 12 &&
      year >= 1000
    ) {
      setCurrentDate(new Date(year, month - 1, 1));
      // calendar ko us month/year pe le jao

      setActiveDay(day);
      // us date ko active karo

      setIsOpen(true);
      // calendar auto open
    }
  }
};


  const openCalendar = () => {
    if (selectedDate) {
      const [_, month, year] = selectedDate.split("/");
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date());
    }
    setIsOpen(true);
  };

  return (
    <div className="datepicker-wrapper">

      <div className="datepicker">
        <input
          type="text"
          placeholder="DD / MM / YYYY"
          value={selectedDate}
          onChange={handleManualInput}   
          onClick={openCalendar}
        />

        <button onClick={() => setIsOpen(!isOpen)}>📅</button>
      </div>

      {isOpen && (
        <div className="calender">

          <div className="calender-header">
            <span className="left-right" onClick={prevMonth}>◀</span>

            <strong>
              {currentMonth.toUpperCase()} {currentYear}
            </strong>

            <span className="left-right" onClick={nextMonth}>▶</span>
          </div>

          <div className="weekdays">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          <div className="dates">
            {blanks.map((_, i) => (
              <span key={`blank-${i}`} className="empty"></span>
            ))}

            {daysArray.map((day) => (
              <span
                key={day}
                className={
                  day === activeDay
                    ? "active"
                    : day === today.getDate() &&
                      currentDate.getMonth() === today.getMonth() &&
                      currentDate.getFullYear() === today.getFullYear() &&
                      !activeDay
                      ? "active"
                      : ""
                }
                onClick={() => {
                  setSelectedDate(
                    `${day}/${currentDate.getMonth() + 1}/${currentYear}`
                  );
                  setActiveDay(day);
                  setIsOpen(false);
                }}
              >
                {day}
              </span>

            ))}
          </div>

        </div>
      )}
    </div>
  );
}