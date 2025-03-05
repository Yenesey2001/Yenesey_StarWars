import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Card = ({ id, name, type, img }) => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/${type}/${id}`);
    };

    const isFavorite = store.favorites.some(fav => fav.id === id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: id }); 
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { id, name, type, img } });
        }
    };

    return (
        <div className="card-starwars">
            <img
                src={img || "https://dummyimage.com/600x400/000/fff&text=No+Image"}
                alt={name}
                className="card-image"
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <button className="btn-starwars" onClick={handleViewMore}>
                    Ver más
                </button>
                <button className="btn-favorite" onClick={toggleFavorite}>
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>
        </div>
    );
};
