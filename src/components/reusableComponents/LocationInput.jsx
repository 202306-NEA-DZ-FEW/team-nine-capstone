import axios from "axios";
import React, { useEffect, useState } from "react";

function LocationInput({ initialLocation, onSelectLocation }) {
    const [location, setLocation] = useState(initialLocation || "");
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    //searches for suggestion
    useEffect(() => {
        if (location.trim() !== "") {
            axios
                .get(
                    `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=5`
                )
                .then((response) => {
                    setResults(response.data);
                })
                .catch((error) => {
                    <span>{error}</span>;
                });
        } else {
            setResults([]);
        }
    }, [location]);

    //keeps up with the input to display the suggestion
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        setShowSuggestions(true);
    };

    //allows user to select a location and put in the input field
    const handleSelectedLocation = (result) => {
        setLocation(result.display_name);
        setShowSuggestions(false);
        onSelectLocation(result.display_name);
    };

    return (
        <div>
            <label htmlFor='locationInput'>Location:</label>
            <input
                className='border-4 focus:border-black'
                type='text'
                id='locationInput'
                value={location}
                placeholder='Insert Your Location'
                onChange={handleLocationChange}
            />
            {showSuggestions && (
                <ul className='w-full border-2 border-black'>
                    {results.map((result) => (
                        <li
                            className='hover:bg-orange-400'
                            key={result.place_id}
                            onClick={() => handleSelectedLocation(result)}
                        >
                            {result.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LocationInput;
