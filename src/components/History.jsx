import React from 'react'
import {
    calculateCurrentSpendingLevel,
    getSpendingImpact,
    timeSinceExpense,
    timeSinceTransaction,
    transactionHistory
} from "../utils/index.js";

export const History = () => {
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-clock-rotate-left"/>
                <h2>History</h2>


            </div>
            <p><i>Hover for more Info</i></p>
            <div className="finerd-history">
                {Object.keys(transactionHistory).sort((a, b) => Number(b) - Number(a)).map((utcTime, financeIndex) => {

                    const finance = transactionHistory[utcTime];
                    const timeSince = timeSinceExpense(utcTime);
                    const impact = getSpendingImpact(finance.category);
                    const remaining = calculateCurrentSpendingLevel({
                        [utcTime] : finance
                    })

                    const summary = ` 
                    Category: ${finance.category}
                    Amount: ₦${finance.amount}
                    Impact:  ₦ ${finance.amount} /  ₦ ${impact}
                    Time: ${timeSince}
                    Remaining Effect: ${remaining}
                   
                   
                    
                    `

                    return (
                        <div  className="wallet-wrapper" title={summary} key={financeIndex}>
                            <i className="fa-solid fa-wallet" />

                        </div>

                    )
                })}
            </div>
        </>
    )
}
