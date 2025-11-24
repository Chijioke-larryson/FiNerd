import React from 'react'
import {
    calculateCurrentSpendingLevel,
    calculateFinanceStats, data, getSpendingImpact, getTopThreeCategories,
    statusLevels,
    transactionHistory,


} from "../utils/index.js";

function StatCard(props)
{
    const {lg, title, children} = props
    return (
        <div className={'card stat-card' + (lg ? ' col-span-2' : '')}>
            <h4>{title}</h4>
            {children}

        </div>
    )
}
export const Stats = () => {
    const stats =  calculateFinanceStats(transactionHistory)
    const financeLevel = calculateCurrentSpendingLevel(transactionHistory)
    const warningLevel = financeLevel < statusLevels['low'].maxLevel ? 'low' :

        financeLevel <  statusLevels['moderate'].maxLevel ? 'moderate' : 'high'



    return (
      <>
          <div className="section-header">
              <i className="fa-solid fa-chart-pie
"/>
              <h2>Stats</h2>


          </div>
          <div className="stats-grid">
              <StatCard lg title="Current Finance Level" >
                  <div className="status">
                      <p><span className="stat-text">{financeLevel}</span> ₦ </p>
                      <h5 style={{color: statusLevels[warningLevel].color, background:statusLevels[warningLevel].background}}>Low</h5>
                  </div>
                  <p>{statusLevels[warningLevel].description}</p>
              </StatCard>
              <StatCard title="Daily Transaction">
                  <p> ₦ <span className="stat-text">{stats.average_daily_spent}</span>  </p>
              </StatCard>
              <StatCard title="Average Transaction">
                  <p><span className="stat-text">{stats.average_transactions}</span></p>
              </StatCard>
              <StatCard title="Total Transaction ($)" >
                  <p> ₦ <span className="stat-text">{stats.total_spent}</span></p>
              </StatCard>

              <table className='stat-table'>
                  <thead>
                  <tr>
                      <th>Transaction Type</th>
                      <th>Number of Transaction</th>
                      <th>Percentage of total %</th>
                  </tr>

                  </thead>

                  <tbody>

                  {getTopThreeCategories(transactionHistory).map((finance, financeIndex) => {
                      console.log("data:", data)
                      console.log(getTopThreeCategories(data))

                      return (
                          <tr key={financeIndex}>
                              <td>{finance.category}</td>
                              <td>{finance.count}</td>
                              <td>{finance.percentage}</td>
                          </tr>
                      )
                  })}



                  </tbody>

              </table>


          </div>


      </>
    )
}
