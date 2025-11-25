import React from "react";
import {
    calculateCurrentSpendingLevel,
    getSpendingImpact,
    timeSinceExpense,
} from "../utils/index.js";
import { useAuth } from "../context/AuthContext.jsx";

export const History = () => {
    const { globalData } = useAuth();

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-clock-rotate-left" />
                <h2>History</h2>
            </div>

            <p><i>Hover for more Info</i></p>

            <div className="finerd-history">
                {Object.keys(globalData || {})
                    .filter(key => !isNaN(Number(key)))
                    .sort((a, b) => Number(b) - Number(a))
                    .map((timestamp, index) => {

                        const rawEntry = globalData[timestamp];
                        console.log("RAW ENTRY:", timestamp, rawEntry);

                        if (!rawEntry) return null;

                        // NORMALIZE DATA HERE
                        const entry = {
                            category: rawEntry.category || rawEntry.name || "Unknown",
                            amount: Number(rawEntry.amount ?? rawEntry.cost ?? 0)
                        };

                        console.log("NORMALIZED ENTRY:", entry);

                        const timeSince = timeSinceExpense(timestamp);
                        const impact = getSpendingImpact(entry.category);
                        const remaining = calculateCurrentSpendingLevel({
                            [timestamp]: entry
                        });

                        const summary = `
Category: ${entry.category}
Amount: ₦${entry.amount}
Impact: ₦${entry.amount} / ₦${impact}
Time: ${timeSince}
Remaining Effect: ${remaining}
                        `;

                        return (
                            <div
                                className={`wallet-wrapper category-${entry.category.toLowerCase()}`}
                                title={summary}
                                key={index}
                            >
                                <i className="fa-solid fa-wallet" />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
