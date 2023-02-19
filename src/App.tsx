import React, { createContext, useContext, useState } from 'react';
import './App.scss';
import Home from './Pages/Home';

export const ThemeContext = createContext<any>(null);

function App() {
  const [theme,setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")
  }

  return (
    <React.Fragment>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div id={theme}>
          <Home/>
        </div>
      </ThemeContext.Provider>
    </React.Fragment>
  );
}

export default App;
