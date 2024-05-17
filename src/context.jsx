import React, { useContext, useState, createContext, useEffect } from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {
    // const savedTheme = localStorage.getItem('isDarkTheme');
    // if (savedTheme!== null) {
    //   return savedTheme === 'true';
    // }
    // return false;

    const preferDarkMode = window.matchMedia('prefers-color-schema:dark').matches;
    const storedDarkMode = localStorage.getItem('isDarkTheme') === 'true';
    return storedDarkMode || preferDarkMode
}




const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('donkey');

  const toggleDarkTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme', isDarkTheme);
    localStorage.setItem('isDarkTheme', isDarkTheme);

  };

  useEffect(() =>{
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme', isDarkTheme);
    // localStorage.setItem('isDarkTheme', isDarkTheme);
  }, [isDarkTheme]);





  return (
    <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm}}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
