import React, { createContext, useState, useEffect } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupShownToday, setPopupShownToday] = useState(false);

  useEffect(() => {
    const shownToday = localStorage.getItem('popupShownToday');
    if (shownToday) {
      setPopupShownToday(true);
    }
  }, []);

  const handlePopup = (message) => {
    alert(message);
    localStorage.setItem('popupShownToday', 'true');
    setPopupShownToday(true);
  };

  return (
    <PopupContext.Provider value={{ handlePopup, popupShownToday }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;
