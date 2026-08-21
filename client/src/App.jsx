import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/transaction/TransactionPage";
import AccountDetails from "./pages/accounts/AccountDetails";

function App() {
  return (
    <Router>
      <div className="myapp">
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<TransactionPage />} />
            <Route path="/accounts" element={<AccountDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
