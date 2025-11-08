import React from 'react'

export const Layout = (props) => {
    const {children} = props

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">FINERD</h1>
                <p>For Finance Culture</p>
            </div>

        </header>

    )
    const footer = (
        <footer></footer>
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
