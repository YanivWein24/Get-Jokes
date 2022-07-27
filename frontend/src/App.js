import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./screens/Home"
import About from "./screens/About"
import Register from "./screens/Register"
import User from "./screens/LoggedUser"
import LogIn from './screens/Login'
import Logout from './screens/Logout'
import userDataAction from './actions/userDataAction'

function App() {

  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)

  const getUserData = async () => {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "/user"
    })
    dispatch(userDataAction(response.data))
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Router>
      <div id={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/LoggedUser" element={<User />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
