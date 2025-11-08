// ==============================
// FiNerd App — index.js
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

// Example transaction history (timestamp: { category, amount })
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

// Spending categories and their weights (used for “financial caffeine” equivalent)
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
    { category: "Coffee & Snacks", impact: 5 },
]

// Half-life logic re-imagined as “spending effect half-life”
// (e.g., how long recent spending affects your financial state)
const halfLifeHours = 72 // 3 days effect window

export function calculateCurrentSpendingLevel(historyData) {
    const currentTime = Date.now()
    const halfLife = halfLifeHours * 60 * 60 * 1000 // convert to ms
    const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days window

    let totalImpact = 0

    for (const [timestamp, entry] of Object.entries(historyData)) {
        const timeElapsed = currentTime - parseInt(timestamp)
        if (timeElapsed <= maxAge) {
            const spendingImpact = getSpendingImpact(entry.category)
            const remainingImpact = spendingImpact * Math.pow(0.5, timeElapsed / halfLife)
            totalImpact += remainingImpact
        }
    }

    return totalImpact.toFixed(2)
}

// Helper: get spending “impact” by category
export function getSpendingImpact(category) {
    const cat = spendingCategories.find(c => c.category === category)
    return cat ? cat.impact : 0
}

// Get top 3 spending categories by frequency
export function getTopThreeCategories(historyData) {
    const categoryCount = {}

    for (const entry of Object.values(historyData)) {
        const catName = entry.category
        categoryCount[catName] = (categoryCount[catName] || 0) + 1
    }

    const sorted = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])
    const total = Object.values(categoryCount).reduce((sum, count) => sum + count, 0)

    return sorted.slice(0, 3).map(([name, count]) => ({
        category: name,
        count,
        percentage: ((count / total) * 100).toFixed(2) + '%'
    }))
}

// Time since last transaction (for dashboard display)
export function timeSinceTransaction(utcMilliseconds) {
    const now = Date.now()
    const diff = now - utcMilliseconds

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)

    let result = ''
    if (months > 0) result += `${months}M `
    if (days % 30 > 0) result += `${days % 30}D `
    if (hours % 24 > 0) result += `${hours % 24}H `
    if (minutes % 60 > 0) result += `${minutes % 60}M `
    if (seconds % 60 > 0 || result === '') result += `${seconds % 60}S`

    return result.trim()
}

// Calculate daily finance stats
export function calculateFinanceStats(transactionHistory) {
    const dailyStats = {}
    let totalSpent = 0
    let totalDays = 0

    for (const [timestamp, tx] of Object.entries(transactionHistory)) {
        const date = new Date(parseInt(timestamp)).toISOString().split('T')[0]
        const amount = parseFloat(tx.amount)

        if (!dailyStats[date]) dailyStats[date] = { spent: 0, count: 0 }

        dailyStats[date].spent += amount
        dailyStats[date].count += 1
        totalSpent += amount
    }

    totalDays = Object.keys(dailyStats).length
    const averageDailySpent = totalDays > 0 ? (totalSpent / totalDays).toFixed(2) : 0

    return {
        average_daily_spent: averageDailySpent,
        total_spent: totalSpent.toFixed(2),
        average_transactions: (Object.values(transactionHistory).length / totalDays).toFixed(2)
    }
}
