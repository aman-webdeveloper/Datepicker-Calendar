// React ka useState hook import
// State manage karne ke liye use hota hai
import { useState } from "react";
import "./Datepicker.css";

export default function Datepicker() {

    // 🔹 Current month & year track karne ke liye Date object
    // Default: aaj ki date se start hoga
    const [currentDate, setCurrentDate] = useState(new Date());

    // 🔹 User ne jo date select ki hai (input box me dikhane ke liye)
    const [selectedDate, setSelectedDate] = useState("");

    // 🔹 Calendar open / close control
    // false = page load par calendar hide rahe
    const [isOpen, setIsOpen] = useState(false);

    // 🔹 Month names array
    // getMonth() number deta hai (0–11), isse name convert karte hain
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // 🔹 Current month ka naam nikalna
    // getMonth() → 0–11
    const currentMonth = monthNames[currentDate.getMonth()];

    // 🔹 Current year nikalna
    const currentYear = currentDate.getFullYear();

    // 🔹 Previous month function
    // Month se 1 minus karke naya Date object set karte hain
    const prevMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1 // hamesha month ka first day
            )
        );
    };

    // 🔹 Next month function
    // Month me 1 add karke next month pe le jata hai
    const nextMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
            )
        );
    };

    // 🔹 Get total days of current month
    // JS trick: next month ka day 0 = current month ka last day
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    // 🔹 Month ka first day ka weekday nikalna
    // getDay(): 0 = Sunday, 6 = Saturday
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();
    // 🔹 Month start hone se pehle jitne blank boxes chahiye
    // Example: firstDayOfMonth = 3 → 3 empty cells
    const blanks = Array.from({ length: firstDayOfMonth });

    // 🔹 Month ke actual days ka array (1 se last day tak)
    const daysArray = Array.from(
        { length: daysInMonth },
        (_, i) => i + 1
    );


    return (

        <div className="datepicker-wrapper">

            {/* 🔹 Input + Calendar icon */}
            <div className="datepicker">
                <input
                    type="text"
                    placeholder="DD / MM / YYYY"
                    value={selectedDate} // selected date yaha show hoti hai
                    readOnly
                />

                {/* 🔹 Icon click pe calendar open / close */}
                <button onClick={() => setIsOpen(!isOpen)}>📅</button>
            </div>

            {/* 🔹 Calendar sirf tab render hoga jab isOpen true ho */}
            {isOpen && (
                <div className="calender">

                    {/* 🔹 Calendar header */}
                    <div className="calender-header">

                        {/* 🔹 Previous month arrow */}
                        <span className="left-right" onClick={prevMonth}>◀</span>

                        {/* 🔹 Month + Year display */}
                        <strong>
                            {currentMonth.toUpperCase()} {currentYear}
                        </strong>

                        {/* 🔹 Next month arrow */}
                        <span className="left-right" onClick={nextMonth}>▶</span>
                    </div>

                    {/* 🔹 Weekday labels */}
                    <div className="weekdays">
                        <span>S</span>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                    </div>

                    {/* 🔹 Dates section (temporary: 1–31) */}
                    <div className="dates">

                        {/* 🔹 Blank cells for alignment */}
                        {blanks.map((_, i) => (
                            <span key={`blank-${i}`} className="empty"></span>
                        ))}

                        {/* 🔹 Real calendar dates */}
                        {daysArray.map((day) => (
                            <span
                                key={day}
                                className={
                                    selectedDate ===
                                        `${day}/${currentDate.getMonth() + 1}/${currentYear}`
                                        ? "active"
                                        : ""
                                }
                                onClick={() => {
                                    setSelectedDate(
                                        `${day}/${currentDate.getMonth() + 1}/${currentYear}`
                                    );
                                    // setIsOpen(false); // date select ke baad calendar band
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