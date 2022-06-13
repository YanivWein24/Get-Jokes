import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import About from "./screens/About"

export const themeContext = createContext(null)

function App() {

  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"))
  }
  return (
    <Router>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/About" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </themeContext.Provider>
    </Router>
  );
}

export default App;
