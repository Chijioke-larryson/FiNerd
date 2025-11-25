import React from "react";
import {
    calculateCurrentSpendingLevel,
    calculateFinanceStats,
    getTopThreeCategories,
    statusLevels,
} from "../utils/index.js";
import { useAuth } from "../context/AuthContext.jsx";

function StatCard({ lg, title, children }) {
    return (
        <div className={"card stat-card" + (lg ? " col-span-2" : "")}>
            <h4>{title}</h4>
            {children}
        </div>
    );
}

export const Stats = () => {
    const { globalData } = useAuth() || {};

    // calculate finance stats
    const stats = calculateFinanceStats(globalData);
    const financeLevel = calculateCurrentSpendingLevel(globalData);

    // determine warning level
    const warningLevel =
        financeLevel < statusLevels.low.maxLevel
            ? "low"
            : financeLevel < statusLevels.moderate.maxLevel
                ? "moderate"
                : "high";

    // ensure numbers display positively for Savings/Investments
    const displayFinanceLevel = Math.abs(financeLevel);

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-pie" />
                <h2>Stats</h2>
            </div>

            <div className="stats-grid">
                {/* Current Finance Level */}
                <StatCard lg title="Current Finance Level">
                    <div className="status">
                        <p>
                            <span className="stat-text">{displayFinanceLevel}</span> ₦
                        </p>
                        <h5
                            style={{
                                color: statusLevels[warningLevel].color,
                                background: statusLevels[warningLevel].background,
                            }}
                        >
                            {warningLevel.charAt(0).toUpperCase() + warningLevel.slice(1)}
                        </h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>

                {/* Daily Average */}
                <StatCard title="Daily Transaction">
                    <p>
                        ₦ <span className="stat-text">{Math.abs(stats.average_daily_spent)}</span>
                    </p>
                </StatCard>

                {/* Average Transactions */}
                <StatCard title="Average Transaction Count">
                    <p>
                        <span className="stat-text">{stats.average_transactions}</span>
                    </p>
                </StatCard>

                {/* Total Spent */}
                <StatCard title="Total Transactions (₦)">
                    <p>
                        ₦ <span className="stat-text">{Math.abs(stats.total_spent)}</span>
                    </p>
                </StatCard>

                {/* Top Categories Table */}
                <table className="stat-table">
                    <thead>
                    <tr>
                        <th>Transaction Type</th>
                        <th>Count</th>
                        <th>Percentage %</th>
                    </tr>
                    </thead>

                    <tbody>
                    {getTopThreeCategories(globalData).map((finance, index) => (
                        <tr key={index}>
                            <td>{finance.category}</td>
                            <td>{finance.count}</td>
                            <td>{finance.percentage || "0%"}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
