import React from 'react'

export const Hero = () => {
    return (
        <>
            <h1>Smart Finance Tracking for Everyday Expenses <abbr title="Finance Nerd">FiNerd</abbr>!</h1>
            <div className="benefits-list">
                <h3 className="font-bolder">Try <span className="text-gradient">FiNerd</span> and start..</h3>
                <p>✅ Tracking every expense</p>
                <p>✅ Measuring your financial health</p>
                <p>✅ Costing and quantifying your spending habits</p>
            </div>
            <div className="card info-card">
                <div>
                    <i className="fa-solid fa-circle-info"></i>
                    <h3>Did you know..</h3>

                </div>
                <h5>Your money’s half-life is shorter than you think , track it before it disappears</h5>
                <p>Money has a half-life too! Five hours after spending $200, $100 of that impact is still “active” in your financial habits, track it to stay in control.</p>

            </div>


        </>

    )
}
