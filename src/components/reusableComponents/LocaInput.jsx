import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

function LocaInput({ initialLocation, onSelectLocation }) {
    const { t } = useTranslation("common");
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
        <div className='relative'>
            <input
                className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                type='text'
                id='locationInput'
                value={location}
                placeholder='Insert Your Location'
                onChange={handleLocationChange}
            />
            {showSuggestions && results.length > 0 && (
                <ul className='absolute z-10 bg-white border border-bgc-Charcoal mt-2 w-full rounded-lg shadow-md'>
                    {results.map((result) => (
                        <li
                            key={result.place_id}
                            onClick={() => handleSelectedLocation(result)}
                            className='hover:bg-bgc-sunflower p-2 cursor-pointer'
                        >
                            {result.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LocaInput;
