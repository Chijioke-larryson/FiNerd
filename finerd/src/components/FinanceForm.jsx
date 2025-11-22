import React, {useState} from 'react'
import {spendingCategories} from "../utils/index.js";
import {Modal} from "./Modal.jsx";
import {Authentication} from "./Authentication.jsx";





export const FinanceForm = (props) => {

    const { isAuthenticated } = props

    const [ showModal, setShowModal] = useState(false)

    const  [showTransactionType, setShowTransactionType] = useState(false)
    const [transactionSelection, setTransactionSelection] = useState(null)
    const [transactionCost, setTransactionCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)

    function handleSubmitForm() {

        if (!isAuthenticated) {
            setShowModal(true)
            return
        }

        console.log(transactionSelection, transactionCost, hour, min)
    }

    function handleCloseModal() {
        setShowModal(false)
    }


    return (
        <>
            { showModal && (<Modal handleCloseModal={handleCloseModal}>
                <Authentication handleCloseModal={handleCloseModal}/>
            </Modal>
            )}
            <div className="section-header">
                <i className="fa-solid fa-pencil"/>
                <h2>Start Tracking Today</h2>

            </div>
            <h4>Select expense type</h4>
            <div className="finerd-grid">
                {spendingCategories.slice(0, 6).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setShowTransactionType(false);
                            setTransactionSelection(option.category);

                        }} className={"button-card " + (option.category === transactionSelection ? 'finerd-button-selected' : ' ')} key={optionIndex}>
                            <h4>{option.category}</h4>
                            <p>₦{option.impact}</p>
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
                <option value="">
                    Select transaction type

                </option>
                {spendingCategories.map((option, optionIndex) => {
                    return (
                        <option value={option.category} key={optionIndex}>
                            {option.category} (₦{option.impact})
                        </option>
                    )
                })}

            </select>
            )}

            <h4>Add the Transaction(₦)</h4>
            <input className="w-full"  type="number" value={transactionCost}  onChange={(e) =>

            {
                setTransactionCost((e.target.value))
            }} placeholder="₦100"/>
            <h4>Time of Transaction</h4>
            <div className="time-entry"></div>
            <div>
                <h3>Hours</h3>
                <select  onChange={(e) => {
                    setHour(number(e.target.value))
                }} id="hours-select">

                    {Array.from({ length: 24 }, (_, i) => i).map((hr) => (
                        <option key={hr} value={hr}>
                            {hr}
                        </option>
                    ))}



                </select>
            </div>

            <div>
                <h3>Mins</h3>
                <select  onChange={(e) => {
                    setMin(number(e.target.value))
                }} id="mins-select">
                    {[0,5,15,20,30,40,50].map((min, minIndex) => {
                        return (
                            <option key={minIndex} value={min}>{min} </option>
                        )
                    })}



                </select>
            </div>
            <button onClick={handleSubmitForm}>
               <p>Add the Entry</p>
            </button>












        </>
    )
}

