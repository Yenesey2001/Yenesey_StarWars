export const initialStore = () => {
  return {
    planets: JSON.parse(localStorage.getItem("planets")) || [],
    vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    characters: JSON.parse(localStorage.getItem("characters")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_PLANETS":
      localStorage.setItem("planets", JSON.stringify(action.payload));
      return { ...store, planets: action.payload };

    case "SET_VEHICLES":
      localStorage.setItem("vehicles", JSON.stringify(action.payload));
      return { ...store, vehicles: action.payload };

    case "SET_CHARACTERS":
      localStorage.setItem("characters", JSON.stringify(action.payload));
      return { ...store, characters: action.payload };

    case "ADD_FAVORITE":
      if (!store.favorites.some(fav => fav.id === action.payload.id)) {
        const updatedFavorites = [...store.favorites, action.payload];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { ...store, favorites: updatedFavorites };
      }
      return store; 

      case "REMOVE_FAVORITE":
        const filteredFavorites = store.favorites.filter(item => item.id !== action.payload);
        localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
        return { ...store, favorites: filteredFavorites };
      

    default:
      throw Error('Unknown action.');
  }
}
