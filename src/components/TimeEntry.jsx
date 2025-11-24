import React, { useState } from "react";

export function TimeEntry({ onTimeChange }) {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);

    const handleHourChange = (e) => {
        const newHour = parseInt(e.target.value);
        setHour(newHour);
        onTimeChange?.({ hour: newHour, minute });
    };

    const handleMinuteChange = (e) => {
        const newMinute = parseInt(e.target.value);
        setMinute(newMinute);
        onTimeChange?.({ hour, minute: newMinute });
    };

    return (
        <div className="time-entry flex gap-4 items-center">
            <div>
                <h6 className="font-semibold text-sm mb-1">Hour</h6>
                <select
                    onChange={handleHourChange}
                    value={hour}
                    className="border border-gray-300 rounded-md p-1"
                    id="hours-select"
                >
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                            {i.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h6 className="font-semibold text-sm mb-1">Minute</h6>
                <select
                    onChange={handleMinuteChange}
                    value={minute}
                    className="border border-gray-300 rounded-md p-1"
                    id="minutes-select"
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>
                            {i.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
