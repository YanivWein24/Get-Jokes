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


export const ThemeContext = createContext(null)

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

  // check and apply the current theme in all children components
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
    getUserData()
  }, []);

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme, isLightTheme }}>
        <div id={theme}>
          <Header userData={userData} />
          <Routes>
            <Route path="/" element={<HomeScreen userData={userData} />} />
            <Route path="/About" element={<About />} />
            <Route path="/UserScreen" element={<UserScreen userData={userData} />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<LogIn />} />
            <Route path="/Logout" element={<Logout userData={userData} />} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
