import React, {useState} from 'react'
import {spendingCategories} from "../utils/index.js";





export const FinanceForm = () => {

    const  [showTransactionType, setShowTransactionType] = useState(false)
    const [transactionSelection, setTransactionSelection] = useState(null)
    const [transactionCost, setTransactionCost] = useState(0)


    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-pencil"/>
                <h2>Start Tracking Today</h2>

            </div>
            <h4>Select expense type</h4>
            <div className="finerd-grid">
                {spendingCategories.slice(0, 6).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setTransactionSelection(option.category)
                            setShowTransactionType(false)
                        }} className={"button-card " + (option.category === transactionSelection ? 'finerd-button-selected' : ' ')} key={optionIndex}>
                            <h4>{option.category}</h4>
                            <p>{option.impact}$</p>
                        </button>
                    )
                })}
                <button  onClick={() =>{
                    setShowTransactionType(true)
                    setTransactionSelection(null)
                }} className={"button-card " + (showTransactionType ? 'finerd-button-selected' : ' ')}>
                    <h4>other</h4>
                    <p>n/a</p>

                </button>

            </div>
            {showTransactionType &&(
                <select onChange={(e) => {
                    setTransactionSelection(e.target.value)

                }} id="finerd-list" name="finerd-list">
                <option value={null}>
                    Select transaction type

                </option>
                {spendingCategories.map((option, optionIndex) => {
                    return (
                        <option value={option.category} key={optionIndex}>
                            {option.category} ({option.impact}$)
                        </option>
                    )
                })}

            </select>
            )}

            <h4>Add the Transaction($)</h4>
            <input className="w-full"  type="number" value={transactionCost}  onChange={(e) =>

            {
                setTransactionCost(e.target.value)
            }} placeholder="$100"/>
            <h4>Time of Transaction</h4>
            <div className="time-entry"></div>
            <div>
                <h3>Hours</h3>
                <select id="hours-select">
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
                        return (
                            <option key={hourIndex} value={hour}>{hour} </option>
                        )
                    })}



                </select>
            </div>

            <div>
                <h3>Mins</h3>
                <select id="mins-select">
                    {[0,5,15,20,30,40,50].map((min, minIndex) => {
                        return (
                            <option key={minIndex} value={min}>{min} </option>
                        )
                    })}



                </select>
            </div>
            <button>Add the Entry</button>












        </>
    )
}

