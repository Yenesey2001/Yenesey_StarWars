import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import "../index.css";
import { useParams } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { uid, id } = useParams();

  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [characters, setCharacters] = useState([]);

  async function getPlanets() {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets");
      if (!response.ok) throw new Error("Error al traer los planetas");
      const data = await response.json();
      setPlanets(data.results);
      dispatch({ type: "SET_PLANETS", payload: data.results });
    } catch (error) {
      console.error("Error en getPlanets:", error);
    }
  }

  async function getVehicles() {
    try {
      const response = await fetch("https://www.swapi.tech/api/vehicles");
      if (!response.ok) throw new Error("Error al traer los vehículos");
      const data = await response.json();
      setVehicles(data.results);
      dispatch({ type: "SET_VEHICLES", payload: data.results });
    } catch (error) {
      console.error("Error en getVehicles:", error);
    }
  }

  async function getCharacters() {
    try {
      const response = await fetch("https://www.swapi.tech/api/people");
      if (!response.ok) throw new Error("Error al traer los personajes");
      const data = await response.json();
      setCharacters(data.results);
      dispatch({ type: "SET_CHARACTERS", payload: data.results });
    } catch (error) {
      console.error("Error en getCharacters:", error);
    }
  }

  useEffect(() => {
    if (!store.planets.length) getPlanets();
    if (!store.vehicles.length) getVehicles();
    if (!store.characters.length) getCharacters();
  }, []);

  return (
    <div className="scroll-container">
      <div className="lists-container">
        <div className="list-container">

          <div className="list-wrapper">
            <h2 className="list-title">Planetas</h2>
            <ul className="list">
              {store.planets.length === 0 ? (
                <p>No hay PLANETAS disponibles</p>
              ) : (
                store.planets.map((planeta) => (
                  <li key={planeta.uid || planeta.name}>
                    <Card name={planeta.name} id={planeta.uid} type="planets" />
                  </li>
                ))
              )}
            </ul>
            <h2 className="list-title">Vehiculos</h2>
            <ul className="list">
              {store.vehicles.length === 0 ? (
                <p>No hay VEHÍCULOS disponibles</p>
              ) : (
                store.vehicles.map((vehicle) => (
                  <li key={vehicle.uid || vehicle.name}>
                    <Card name={vehicle.name} id={vehicle.uid} type="vehicles" />
                  </li>
                ))
              )}
            </ul>
            <h2 className="list-title">Personajes</h2>
            <ul className="list">
              {store.characters.length === 0 ? (
                <p>No hay PERSONAJES disponibles</p>
              ) : (
                store.characters.map((charac) => (
                  <li key={charac.uid || charac.name}>
                    <Card name={charac.name} id={charac.uid} type="people" />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
