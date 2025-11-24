// src/components/TransactionCard.jsx
import React, { useState } from "react";
import { formatDateTime, timeSinceExpense } from "../utils/index.js";
import { TimeEntry } from "./TimeEntry";

export function TransactionCard({ timestamp = Date.now(), category = "N/A", amount = 0 }) {
    return (
        <div className="transaction-card border rounded-lg p-3 shadow-sm bg-white mt-4">
            <p className="category font-semibold text-gray-800">{category}</p>
            <p className="amount text-green-600 font-medium">${amount}</p>
            <small className="timestamp text-gray-500 block mt-1">
                {formatDateTime(timestamp)} • {timeSinceExpense(timestamp)}
            </small>
        </div>
    );
}

export function AddTransaction() {
    const [selectedTime, setSelectedTime] = useState({ hour: 0, minute: 0 });

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        console.log("Selected time:", time);
    };

    return (
        <div className="mt-4">
            <h4 className="font-bold mb-2">Add Transaction Time</h4>
            <TimeEntry onTimeChange={handleTimeChange} />

            <p className="text-gray-600 mt-2 text-sm">
                Selected Time — {selectedTime.hour}:{selectedTime.minute.toString().padStart(2, "0")}
            </p>
        </div>
    );
}
