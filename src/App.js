import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import About from "./screens/About"

export const themeContext = createContext(null)

const getLocalStorage = () => {
  let theme = localStorage.getItem('theme')
  return theme ? JSON.parse(theme) : "light"
  // if there is a theme saved in local storage. use it. otherwise, use the default - "light"
}

function App() {

  const [theme, setTheme] = useState(getLocalStorage ? getLocalStorage : "light")
  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"))
  }
  return (
    <Router>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomeScreen theme={theme} />} />
            <Route path="/About" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </themeContext.Provider>
    </Router>
  );
}

export default App;
