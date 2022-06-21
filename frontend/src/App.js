import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import About from "./screens/About"
import Register from "./screens/Register"
import User from "./screens/User"
import LogIn from './screens/Login';

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

  const [data, setData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    jokes: []
  })

  const getUserData = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/user"
    }).then((res) => {
      const { _id, email, firstName, lastName, jokes } = res.data
      setData({ id: _id, email: email, firstName: firstName, lastName: lastName, jokes: jokes })
    })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getUserData()
  }, []);

  return (
    <Router>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} data={data} />
          <Routes>
            <Route path="/" element={<HomeScreen theme={theme} />} />
            <Route path="/About" element={<About />} />
            {data.id && <Route path="/User" element={<User data={data} />} />}
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<LogIn />} />
          </Routes>
          <Footer />
        </div>
      </themeContext.Provider>
    </Router>
  );
}

export default App;
