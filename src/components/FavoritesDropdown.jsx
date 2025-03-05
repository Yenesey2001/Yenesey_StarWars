import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const FavoritesDropdown = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const removeFavorite = (id) => {
        dispatch({ type: "REMOVE_FAVORITE", payload: id });
    };

    return (
        <div className="favorites-dropdown">
            <button className="dropdown-btn">
                ⭐ Favoritos <span className="fav-count">({store.favorites.length})</span>
            </button>
            <div className="dropdown-content">
                {store.favorites.length === 0 ? (
                    <p className="no-favorites">No hay favoritos</p>
                ) : (
                    store.favorites.map((fav) => (
                        <div key={fav.id} className="favorite-item">
                            <span onClick={() => navigate(`/${fav.type}/${fav.id}`)}>
                                {fav.name}
                            </span>
                            <button onClick={() => removeFavorite(fav.id)}>❌</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
