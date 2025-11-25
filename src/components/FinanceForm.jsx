import React, { useState } from 'react';
import { spendingCategories } from "../utils/index.js";
import { Modal } from "./Modal.jsx";
import { Authentication } from "./Authentication.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";

export const FinanceForm = (props) => {
    const { isAuthenticated } = props;
    const [showModal, setShowModal] = useState(false);
    const [otherMode, setOtherMode] = useState(false);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(1); // starts at 1
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    const { globalData, setGlobalData, globalUser } = useAuth();

    const handleSubmitForm = async () => {
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }

        if (!transactionCategory || transactionAmount < 1) return;

        try {
            const nowTime = Date.now();
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000);
            const timestamp = nowTime - timeToSubtract;

            const entry = {
                category: transactionCategory,
                amount: Number(transactionAmount)
            };

            const newGlobalData = { ...(globalData || {}), [timestamp]: entry };
            setGlobalData(newGlobalData);

            const userRef = doc(db, 'users', globalUser.uid);
            await setDoc(userRef, { [timestamp]: entry }, { merge: true });

            // Reset form
            setTransactionCategory('');
            setTransactionAmount(1);
            setHour(0);
            setMin(0);
            setOtherMode(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => setShowModal(false)}>
                    <Authentication handleCloseModal={() => setShowModal(false)} />
                </Modal>
            )}

            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h2>Start Tracking Today</h2>
            </div>

            <h4>Select Expense Type</h4>
            <div className="finerd-grid">
                {spendingCategories.map((option, index) => (
                    <button
                        key={index}
                        className={`button-card ${transactionCategory === option.category ? 'finerd-button-selected' : ''}`}
                        onClick={() => {
                            setOtherMode(false);
                            setTransactionCategory(option.category);
                        }}
                    >
                        <h4>{option.category}</h4>
                        <p>₦{option.impact}</p>
                    </button>
                ))}
                <button
                    className={`button-card ${otherMode ? 'finerd-button-selected' : ''}`}
                    onClick={() => {
                        setOtherMode(true);
                        setTransactionCategory('');
                    }}
                >
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>

            {otherMode && (
                <select
                    value={transactionCategory}
                    onChange={(e) => setTransactionCategory(e.target.value)}
                    className="w-full mt-2"
                >
                    <option value="">Select unique expense</option>
                    {/* Here you can put a list of predefined “other” expense types */}
                    <option value="Gifts">Gifts</option>
                    <option value="Charity">Charity</option>
                    <option value="Medical">Medical</option>
                    <option value="Travel">Travel</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            )}

            <h4>Add Transaction Amount (₦)</h4>
            <input
                type="number"
                value={transactionAmount}
                min={1} // cannot go below 1
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                placeholder="₦1"
                className="w-full"
            />

            <h4>Time of Transaction</h4>
            <div className="time-entry">
                <div>
                    <h3>Hours</h3>
                    <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
                        {Array.from({ length: 24 }, (_, i) => i).map((hr) => (
                            <option key={hr} value={hr}>{hr}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3>Minutes</h3>
                    <select value={min} onChange={(e) => setMin(Number(e.target.value))}>
                        {[0, 5, 10, 15, 20, 30, 40, 50].map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button onClick={handleSubmitForm} className="mt-4">
                <p>Add Entry</p>
            </button>
        </>
    );
};
