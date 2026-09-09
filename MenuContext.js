

import { createContext, useContext, useState } from 'react';

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const addMenuItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 3000);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, showSuccessBanner }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}