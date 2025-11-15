import React, {useState} from 'react'
import {Modal} from "./Modal.jsx";
import {Authentication} from "./Authentication.jsx";

export const Layout = (props) => {
    const {children} = props

    const [showModal, setShowModal] = useState(false)

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">FINERD</h1>
                <p>For Finance Culture</p>
            </div>
            <button onClick={() => {
                setShowModal(true)
            }}>
                <p>Sign up for free</p>
                <i className="fa-solid fa-coins"></i>
                <i className="fa-solid fa-money-bill-1"></i>
            </button>

        </header>

    )
    const footer = (
        <footer>

            <p><span className="text-gradient">FiNerd</span> was made by<a href="https://chijioke-larrys.netlify.app/" target="_blank"> Chijioke L </a> <br /> using the <a href="https://github.com/Chijioke-larryson/FiNerd/blob/main/finerd/src/fanta.css" target="_blank">FantaCSS</a>
            <br/> Check out the project on <a target="_blank" href="/">GitHub</a>
            </p>
        </footer>
    )

    return (
      <>
          { showModal && (<Modal handleCloseModal={() => {
              setShowModal(false)
          }}>
              <Authentication/>
          </Modal>)}
          {header}
          <main>
              {children}
          </main>

          {footer}

      </>
    )
}
