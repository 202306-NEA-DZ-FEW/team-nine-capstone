import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

function LocationInput({ initialLocation, onSelectLocation }) {
    const { t } = useTranslation("common");
    const [location, setLocation] = useState(initialLocation || "");
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        setShowSuggestions(true);
    };

    const handleSelectedLocation = (result) => {
        setLocation(result.display_name);
        setShowSuggestions(false);
        onSelectLocation(result.display_name);
    };

    return (
        <div className='relative flex flex-col'>
            <label htmlFor='locationInput' className='text-lg'>
                {t("profile.Location")}
            </label>
            <div>
                <input
                    className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                    type='text'
                    id='locationInput'
                    value={location}
                    placeholder='Insert Your Location'
                    onChange={handleLocationChange}
                />
                {showSuggestions && (
                    <ul className='border-2 border-black rounded-b-lg text-lg bg-white  absolute z-10 top-full '>
                        {results.map((result) => (
                            <li
                                className='hover:bg-green-300 w-52'
                                key={result.place_id}
                                onClick={() => handleSelectedLocation(result)}
                                style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {result.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default LocationInput;
