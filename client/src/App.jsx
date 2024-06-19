

// import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';


import './App.css'
import './index.css'

import NoteState from './context/NoteState';


function App() {

  return (
    <>
      <NoteState>
        <Router>
          <div className="flex-col">
            <Navbar></Navbar>

            <Routes>

              <Route path="/Dashboard" element={<Dashboard></Dashboard>} />
              <Route path="/" element={<Home></Home>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/signUp" element={<SignUp></SignUp>} />
            </Routes>
          </div>

        </Router>

      </NoteState>
    </>
  )
}

export default App
