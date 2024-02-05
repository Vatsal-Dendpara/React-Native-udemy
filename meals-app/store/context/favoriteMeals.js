import { createContext, useState } from "react";

export const FavoriteMealContext = createContext({
  ids: [],
  addFavoriteMeal: (id) => {},
  removeFavoriteMeal: (id) => {},
});

export const FavoriteMealContextProvider = ({ children }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  const addFavoriteMeal = (id) => {
    setFavoriteMealIds((currentIds) => [...currentIds, id]);
  };

  const removeFavoriteMeal = (id) => {
    setFavoriteMealIds((currentIds) =>
      currentIds.filter((mealId) => mealId !== id)
    );
  };

  const value = {
    ids: favoriteMealIds,
    addFavoriteMeal: addFavoriteMeal,
    removeFavoriteMeal: removeFavoriteMeal,
  };

  return (
    <FavoriteMealContext.Provider value={value}>
      {children}
    </FavoriteMealContext.Provider>
  );
};
