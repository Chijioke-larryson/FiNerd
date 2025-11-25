// ==============================
// FiNerd App — index.js (FULL FIXED VERSION)
// ==============================

// Spending intensity levels
export const statusLevels = {
    low: {
        color: "#047857",
        background: "#d1fae5",
        description:
            "Spending levels are healthy and well-balanced — you're saving effectively and maintaining good financial habits.",
        maxLevel: 100
    },
    moderate: {
        color: "#b45309",
        background: "#fef3c7",
        description:
            "Moderate spending detected — you're enjoying life but might need to watch recurring or impulse expenses.",
        maxLevel: 200
    },
    high: {
        color: "#e11d48",
        background: "#ffe4e6",
        description:
            "High spending level! Review your expenses and set limits to avoid budget strain or debt accumulation.",
        maxLevel: 9999
    }
}


// ==============================
// Example Local Transaction History
// (Only used if Firebase is not loaded)
// ==============================
export const transactionHistory = {
    "1727579064032": { category: "Groceries", amount: 54.20 },
    "1727629263026": { category: "Transportation", amount: 18.50 },
    "1727571485301": { category: "Dining Out", amount: 32.00 },
    "1727585485245": { category: "Entertainment", amount: 25.00 },
    "1727614392214": { category: "Investments", amount: 150.00 },
    "1727642088808": { category: "Utilities", amount: 45.33 },
    "1727600684481": { category: "Coffee & Snacks", amount: 6.25 },
    "1727615806680": { category: "Subscriptions", amount: 12.99 },
    "1727609623836": { category: "Savings", amount: 200.00 },
    "1727647449961": { category: "Clothing", amount: 40.00 }
}


// ==============================
// Spending Categories List
// ==============================
export const spendingCategories = [
    { category: "Groceries", impact: 20 },
    { category: "Transportation", impact: 10 },
    { category: "Dining Out", impact: 25 },
    { category: "Entertainment", impact: 30 },
    { category: "Investments", impact: -40 },
    { category: "Savings", impact: -50 },
    { category: "Utilities", impact: 15 },
    { category: "Subscriptions", impact: 10 },
    { category: "Clothing", impact: 20 },
    { category: "Coffee & Snacks", impact: 5 }
]


// ==============================
// Spending Half-Life Calculation
// ==============================
const halfLifeHours = 72; // 3 days

export function calculateCurrentSpendingLevel(historyData) {
    if (!historyData) return 0; // guard against undefined/null

    const currentTime = Date.now();
    const halfLife = halfLifeHours * 60 * 60 * 1000;
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    let totalImpact = 0;

    for (const [timestamp, entry] of Object.entries(historyData)) {
        const ts = Number(timestamp);
        if (isNaN(ts)) continue;

        const timeElapsed = currentTime - ts;
        if (timeElapsed > maxAge) continue;

        const spendingImpact = getSpendingImpact(entry.category);
        const remainingImpact = spendingImpact * Math.pow(0.5, timeElapsed / halfLife);
        totalImpact += remainingImpact;
    }

    return totalImpact.toFixed(2);
}




// ==============================
// Time & Date Formatting
// ==============================

// Example: "Nov 10, 2025, 4:35 PM"
export function formatDateTime(timestamp) {
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}


// Example: "3 hours ago"
export function timeSinceExpense(timestamp) {
    const ts = Number(timestamp);
    if (isNaN(ts)) return "";

    const seconds = Math.floor((Date.now() - ts) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return "Just now";
}


// Example: "2D 5H 30M"
export function timeSinceTransaction(utcMs) {
    const ts = Number(utcMs);
    if (isNaN(ts)) return "";

    const diff = Date.now() - ts;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    const parts = [];
    if (months) parts.push(`${months}M`);
    if (days % 30) parts.push(`${days % 30}D`);
    if (hours % 24) parts.push(`${hours % 24}H`);
    if (minutes % 60) parts.push(`${minutes % 60}M`);
    if (seconds % 60 || parts.length === 0) parts.push(`${seconds % 60}S`);

    return parts.join(" ");
}


// ==============================
// Spending Impact Helper
// ==============================
export function getSpendingImpact(category) {
    const cat = spendingCategories.find(c => c.category === category);
    if (!cat) return 0;

    // Treat Investments and Savings as positive
    if (category === "Investments" || category === "Savings") {
        return Math.abs(cat.impact);
    }
    return cat.impact;
}


// ==============================
// Top 3 Categories
// ==============================
export function getTopThreeCategories(data) {
    const categoryCount = {};

    for (const entry of Object.values(data)) {
        const catName = entry.category || entry.name;
        if (!catName) continue;

        categoryCount[catName] = (categoryCount[catName] || 0) + 1;
    }

    const total = Object.values(categoryCount).reduce((sum, count) => sum + count, 0) || 1;

    const sorted = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    return sorted.map(([name, count]) => ({
        category: name,
        count,
        percentage: ((count / total) * 100).toFixed(2) + "%"
    }));
}



// ==============================
// Daily Finance Statistics
// ==============================
export function calculateFinanceStats(historyData) {
    if (!historyData || typeof historyData !== "object") {
        return { average_daily_spent: "0", total_spent: "0", average_transactions: "0" };
    }

    const daily = {};
    let total = 0;

    for (const [timestamp, entry] of Object.entries(historyData)) {
        const ts = Number(timestamp);
        const d = new Date(ts);

        if (isNaN(ts) || isNaN(d.getTime())) {
            console.warn("Invalid timestamp:", timestamp);
            continue;
        }

        const date = d.toISOString().split("T")[0];
        const amount = Number(entry.amount || entry.cost || 0);

        if (!daily[date]) daily[date] = { spent: 0, count: 0 };

        daily[date].spent += amount;
        daily[date].count++;
        total += amount;
    }

    const days = Object.keys(daily).length || 1;

    return {
        average_daily_spent: (total / days).toFixed(2),
        total_spent: total.toFixed(2),
        average_transactions: (
            Object.values(historyData).length / days
        ).toFixed(2)
    };
}
