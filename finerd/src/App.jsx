import {Layout} from "./components/Layout.jsx";
import {Hero} from "./components/Hero.jsx";
import {FinanceForm} from "./components/FinanceForm.jsx";
import {Stats} from "./components/Stats.jsx";
import {History} from "./components/History.jsx";

function App() {
 const isAuthenticated =  true

    const authenticatedContent = (
        <>
        <Stats />
            <History />

        </>
    )

    return (
       <Layout>
           <Hero />
           <FinanceForm />
           {isAuthenticated && (authenticatedContent)}


       </Layout>

    )
}

export default App
