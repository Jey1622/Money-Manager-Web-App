import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="myapp">
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
