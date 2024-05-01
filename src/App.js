import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Authentication/LogIn";
import Register from "./Authentication/Register";
import Forget from "./Authentication/Forget";
import Dashboard from "./Dashboard";
import config from "./services/config.json";
function App() {

  return (
    <>
      <Routes>
        <Route path={`/${config.demo}login/`} element={<LogIn />} />
        <Route path={`/${config.demo}register/`} element={<Register />} />
        <Route path={`/${config.demo}forgot/`} element={<Forget />} />
        <Route path={`/${config.demo}*`} element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
