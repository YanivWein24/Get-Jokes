import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import About from "./screens/About"
import Register from "./screens/Register"
import UserScreen from "./screens/UserScreen"
import LogIn from './screens/Login';
import Logout from './screens/Logout';

export const themeContext = createContext(null)

const getLocalStorage = () => {
  const theme = localStorage.getItem('theme')
  return theme ? JSON.parse(theme) : "light"
  // if there is a theme saved in local storage, use it. otherwise use the default theme - "light"
}

function App() {

  const [theme, setTheme] = useState(getLocalStorage ? getLocalStorage : "light")
  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"))
  }

  const isLightTheme = theme === 'light'

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    jokes: []
  })

  const getUserData = async () => {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "/user"
    })
    console.log(response.data)
    const { _id, email, firstName, lastName, jokes } = response.data
    setUserData({ id: _id, email: email, firstName: firstName, lastName: lastName, jokes: jokes })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getUserData()
  }, []);

  return (
    <Router>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} userData={userData} />
          <Routes>
            <Route path="/" element={<HomeScreen isLightTheme={isLightTheme} userData={userData} getUserData={getUserData} />} />
            <Route path="/About" element={<About />} />
            <Route path="/UserScreen" element={<UserScreen userData={userData} isLightTheme={isLightTheme} />} />
            <Route path="/Register" element={<Register isLightTheme={isLightTheme} />} />
            <Route path="/Login" element={<LogIn isLightTheme={isLightTheme} />} />
            <Route path="/Logout" element={<Logout userData={userData} theme={theme} />} />
          </Routes>
          <Footer />
        </div>
      </themeContext.Provider>
    </Router>
  );
}

export default App;
