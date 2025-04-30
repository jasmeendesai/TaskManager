import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import TaskState from "./context/task/taskState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserState from "./context/user/userState";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  return (
    <>
    <UserState>
      <TaskState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </TaskState>
      </UserState>
    </>
  );
}

export default App;