import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Common from "./components/common";
import { Bounce, ToastContainer } from "react-toastify";
import Expenses from "./pages/expenses";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Common />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
