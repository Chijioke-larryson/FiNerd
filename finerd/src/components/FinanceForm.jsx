import React, { useState } from "react";
import { spendingCategories } from "../utils/index.js";
import { TransactionCard, AddTransaction } from "./TransactionCard.jsx";

export const FinanceForm = () => {
    const [showFinanceTypes, setShowFinanceTypes] = useState(false)
    const [selectedFinance, setSelectedFinance ] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [timestamp, setTimestamp] = useState(Date.now());

    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleTimeChange = ({ hour, minute }) => {
        // generate a new timestamp based on today’s date + selected time
        const now = new Date();
        now.setHours(hour);
        now.setMinutes(minute);
        now.setSeconds(0);
        setTimestamp(now.getTime());
    };

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h2>Start Tracking Today</h2>
            </div>

            <h4>Select expense type</h4>
            <div className="finerd-grid">
                {spendingCategories.slice(0, 6).map((option, i) => (
                    <button className={"button-card" + (option.category === selectedFinance ? 'finerd-button-selected' : '' )}
                        key={i}
                        onClick={() => {
                            setSelectedFinance(option.category)
                            setShowFinanceTypes(false)
                        } }
                    >
                        <h4>{option.category}</h4>
                        <p>{option.impact}$</p>
                    </button>
                ))}
                <button  onClick={() => {
                    setShowFinanceTypes(true)
                    setSelectedFinance(null)
                }} className={"button-card" + (showFinanceTypes ? 'finerd-button-selected' : '' )}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>

            { showFinanceTypes &&(
                <select  id="finerd-list" name="finerd-list" onChange={(e) => {
                    handleCategoryChange
                    setSelectedFinance(e.target.value)
                }}>
                <option value={""}>Select transaction type</option>
                {spendingCategories.map((option, i) => (
                    <option value={option.category} key={i}>
                        {option.category} ({option.impact}$)
                    </option>

                ))}
            </select>)}

            <h4>Add your transaction ($)</h4>
            <input
                className="w-full border p-1 rounded-md"
                type="number"
                placeholder="$100"
                value={amount}
                onChange={handleAmountChange}
            />

            {/* 🕒 Time selection */}
            <AddTransaction onTimeChange={handleTimeChange} />

            {/* 💳 Preview the transaction */}
            <TransactionCard
                timestamp={timestamp}
                category={selectedCategory || "No category selected"}
                amount={amount || "0.00"}
            />
        </>
    );
};
