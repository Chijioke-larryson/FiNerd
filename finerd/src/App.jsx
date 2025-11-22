import {Layout} from "./components/Layout.jsx";
import {Hero} from "./components/Hero.jsx";
import {FinanceForm} from "./components/FinanceForm.jsx";
import {Stats} from "./components/Stats.jsx";
import {History} from "./components/History.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {calculateCurrentSpendingLevel, calculateFinanceStats, transactionHistory} from "./utils/index.js";

function App() {
    const { globalUser, isLoading } = useAuth()
    let globalData = calculateFinanceStats(transactionHistory)

    const isAuthenticated =  globalUser
    const isData = globalData && !!Object.keys(globalData || {}).length

    const authenticatedContent = (
        <>
        <Stats />
            <History />

        </>
    )

    return (
       <Layout>
           <Hero />
           <FinanceForm  isAuthenticated = {isAuthenticated}/>
           {(isAuthenticated && isLoading) && (
               <p>Loading Data....</p>
           )}
           {(isAuthenticated && isData) && (authenticatedContent)}


       </Layout>

    )
}

export default App
