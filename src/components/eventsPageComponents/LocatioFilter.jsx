import { useTranslation } from "next-i18next";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { MdLocationOn, MdNotListedLocation } from "react-icons/md";

import LocationModal from "./LocationModal";

function LocatioFilter({
    events,
    handleLocation,
    setLocation,
    location,
    prevLocation,
    setPrevLocation,
}) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    return (
        <Fragment>
            {/* button to show the locations provided in the events */}
            <div className='flex flex-col gap-3 justify-center items-center'>
                <div
                    onClick={() => setShowModal(true)}
                    className='flex flex-row justify-center text-lg font-medium cursor-pointer items-center w-48 border-b-2 gap-x-3 border-solid hover:border-orange-500 hover:text-orange-500 border-black '
                >
                    {t("Choose Location")} <MdNotListedLocation />
                </div>
                {/* div that holds the location choosen by the user */}
                <div
                    onClick={() => {
                        handleLocation(location);
                    }}
                    className={`flex flex-row text-lg cursor-pointer transition-all hover:bg-orange-500 justify-center items-center gap-x-2 font-medium w-[90%] border-2 border-solid border-black rounded-md shadow-xl h-10 ${
                        location === prevLocation &&
                        location !== null &&
                        prevLocation !== null
                            ? "bg-orange-500 transition-all scale-95"
                            : ""
                    }`}
                >
                    {location || prevLocation ? (
                        <Fragment>
                            {location || prevLocation}
                            <MdLocationOn />
                        </Fragment>
                    ) : null}
                </div>
            </div>
            <LocationModal
                setPrevLocation={setPrevLocation}
                setLocation={setLocation}
                events={events}
                isVisible={showModal}
                onClose={() => setShowModal(false)}
            />
        </Fragment>
    );
}

export default LocatioFilter;
