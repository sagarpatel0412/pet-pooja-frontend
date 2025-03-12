import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Common from "./components/common/Common";
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/Expenses";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<Common />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
