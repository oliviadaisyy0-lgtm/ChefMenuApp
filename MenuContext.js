import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const showBanner = (message) => {
    setBannerMessage(message);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 3000);
  };

  const addMenuItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
    showBanner("Menu item added successfully");
  };

  const updateMenuItem = (id, updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...updatedItem, id } : item)),
    );
    showBanner("Menu item updated successfully");
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    showBanner("Menu item deleted successfully");
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        showSuccessBanner,
        bannerMessage,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
