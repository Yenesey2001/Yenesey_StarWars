import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { FavoritesDropdown } from "./FavoritesDropdown";

export const Navbar = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    
    const handleSearch = (e) => {
        const term = e.target.value; 
        setSearchTerm(term);

        if (term.length > 1) {
            const allItems = [...store.planets, ...store.vehicles, ...store.characters];

            const results = allItems.filter(item =>
                item.name.toLowerCase().includes(term.toLowerCase()) 
            );

            setFilteredResults(results);
            setSelectedIndex(-1); 
        } else {
            setFilteredResults([]);
        }
    };

    
    const handleSelectItem = (item) => {
		
		let itemType = "";
		if (store.planets.includes(item)) itemType = "planets";
		if (store.vehicles.includes(item)) itemType = "vehicles";
		if (store.characters.includes(item)) itemType = "people";
	
		
		const itemId = item.uid || item.id;
	
		
		if (!itemId || !itemType) {
			console.error("Error: ID o tipo de item no válido", item);
			return;
		}
	
		navigate(`/${itemType}/${itemId}`);
		setSearchTerm("");
		setFilteredResults([]);
	};
	

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>🌌 Star Wars</div>

            {/* Barra de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                {filteredResults.length > 0 && (
                    <ul className="search-results">
                        {filteredResults.map((item) => (
                            <li key={item.id} onClick={() => handleSelectItem(item)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <FavoritesDropdown />
        </nav>
    );
};
