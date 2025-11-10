import React from 'react'
import {spendingCategories} from "../utils/index.js";

export const FinanceForm = () => {
    return (
       <>
           <div className="section-header">
               <i className="fa-solid fa-pencil"/>
               <h2>Start Tracking Today</h2>

           </div>
           <h4>Select expense type</h4>
           <div className="finerd-grid">
               {spendingCategories.slice(0, 5).map((option, optionIndex) => {
                   return (
                       <button className="button-card" key={optionIndex}>
                           <h4>{option.category}</h4>
                           <p>{option.impact}$</p>
                       </button>
                   )
               })}
               <button className="button-card">
                   <h4>other</h4>
                   <p>n/a</p>

               </button>

           </div>
           <select id="finerd-list" name="finerd-list">
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
       </>
    )
}
