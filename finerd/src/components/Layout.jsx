import React from 'react'

export const Layout = (props) => {
    const {children} = props

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">FINERD</h1>
                <p>For Finance Culture</p>
            </div>
            <button>
                <p>Sign up free</p>
                <i className="fa-solid fa-coins"></i>
                <i className="fa-solid fa-money-bill-1"></i>
            </button>

        </header>

    )
    const footer = (
        <footer>
            <p><span className="text-gradient">FiNerd</span> was made by<a href="https://chijioke-larrys.netlify.app/" target="_blank"> Chijioke L </a> <br /> using the <a href="https://github.com/Chijioke-larryson/FiNerd/blob/main/finerd/src/fanta.css" target="_blank">FantaCSS</a></p>
        </footer>
    )

    return (
      <>
          {header}
          <main>
              {children}
          </main>

          {footer}

      </>
    )
}
