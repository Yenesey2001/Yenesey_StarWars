import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailView = () => {
    const { type, id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                if (!response.ok) throw new Error("Error al obtener los datos");
                const result = await response.json();
                setData(result.result.properties);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [type, id]);

    const isFavorite = store.favorites.some(fav => fav.id === id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: id });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { id, name: data.name, type } });
        }
    };

    return (
        <div className="details-container">
            <button className="btn-back" onClick={() => navigate(-1)}>⬅ Volver</button>
            {loading ? (
                <p className="loading-text">Cargando información...</p>
            ) : data ? (
                <div className="details-card">
                    <h2 className="title">{data.name}</h2>
                    <button className="btn-favorite" onClick={toggleFavorite}>
                        {isFavorite ? "❤️" : "🤍"}
                    </button>

                    <div className="info-list">
                        {data.description && <p><strong>Descripción:</strong> {data.description}</p>}
                        {data.gender && <p><strong>Género:</strong> {data.gender}</p>}
                        {data.height && <p><strong>Altura:</strong> {data.height} cm</p>}
                        {data.mass && <p><strong>Peso:</strong> {data.mass} kg</p>}
                        {data.eye_color && <p><strong>Color de ojos:</strong> {data.eye_color}</p>}
                        {data.hair_color && <p><strong>Color de cabello:</strong> {data.hair_color}</p>}
                        {data.skin_color && <p><strong>Color de piel:</strong> {data.skin_color}</p>}
                        {data.birth_year && <p><strong>Año de nacimiento:</strong> {data.birth_year}</p>}
                        {data.population && <p><strong>Población:</strong> {data.population}</p>}
                        {data.climate && <p><strong>Clima:</strong> {data.climate}</p>}
                        {data.terrain && <p><strong>Terreno:</strong> {data.terrain}</p>}
                        {data.diameter && <p><strong>Diámetro:</strong> {data.diameter} km</p>}
                        {data.model && <p><strong>Modelo:</strong> {data.model}</p>}
                        {data.manufacturer && <p><strong>Fabricante:</strong> {data.manufacturer}</p>}
                        {data.vehicle_class && <p><strong>Clase de vehículo:</strong> {data.vehicle_class}</p>}
                        {data.cost_in_credits && <p><strong>Costo en créditos:</strong> {data.cost_in_credits}</p>}
                        {data.length && <p><strong>Longitud:</strong> {data.length} m</p>}
                        {data.crew && <p><strong>Tripulación:</strong> {data.crew}</p>}
                        {data.passengers && <p><strong>Pasajeros:</strong> {data.passengers}</p>}
                        {data.cargo_capacity && <p><strong>Capacidad de carga:</strong> {data.cargo_capacity}</p>}
                        {data.max_atmosphering_speed && <p><strong>Velocidad máxima:</strong> {data.max_atmosphering_speed} km/h</p>}
                        {data.consumables && <p><strong>Duración de consumibles:</strong> {data.consumables}</p>}
                    </div>
                </div>
            ) : (
                <p className="error-text">No se encontraron datos.</p>
            )}
        </div>
    );
};
