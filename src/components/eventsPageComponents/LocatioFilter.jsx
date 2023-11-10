import { useTranslation } from "next-i18next";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn, MdNotListedLocation } from "react-icons/md";

function LocatioFilter({
    setLocationSearch,
    locationSearch,
    handleSearch,
    isOpen,
    events,
    handleLocation,
    setLocation,
    location,
    prevLocation,
    setPrevLocation,
}) {
    const uniqueLocations = new Set();
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    return (
        <Fragment>
            {/* button to show the locations provided in the events */}
            <div className='flex flex-col gap-3 justify-center items-center'>
                {/* <div
                    onClick={() => (isOpen ? null : setShowModal(true))}
                    className={`flex flex-row justify-center text-lg font-medium  ${
                        isOpen
                            ? " mb-2"
                            : "hover:text-orange-500 hover:border-orange-500 cursor-pointer"
                    } items-center w-48 border-b-2 gap-x-3 border-solid  border-black `}
                >
                    {t("Choose Location")}
                </div> */}
                <div className='relative w-[70%] flex flex-row bg-gray-200  rounded-full my-3'>
                    <div className='  text-gray-400 flex justify-center items-center px-2'>
                        <BsSearch />
                    </div>

                    <input
                        type='text'
                        className='form control px-3 text-sm lg:text-lg flex justify-center items-center rounded-full font-medium bg-gray-200 w-full border-none outline-none focus:border-none h-10'
                        onChange={handleSearch}
                        value={location}
                        placeholder={t("Choose Location")}
                    />
                    <div className='absolute z-30 w-[100%] mt-2 gap-4 top-9 flex-col shadow-lg  rounded-md bg-gray-200 h-auto self-center px-3 text-xl flex justify-center items-start font-medium overflow-y-auto'>
                        {locationSearch?.map((search) => (
                            <div
                                onClick={() => {
                                    setLocation(search);
                                    setLocationSearch([]);
                                    setPrevLocation(search);
                                }}
                                className='flex cursor-pointer hover:bg-amber-400 px-2 rounded-md w-full flex-row items-center'
                                key={search.id}
                            >
                                {" "}
                                {search} <MdLocationOn />
                            </div>
                        ))}
                    </div>
                </div>
                {/* div that holds the location choosen by the user */}
                <div
                    onClick={() => {
                        handleLocation(location);
                    }}
                    className={`${"flex flex-row text-lg cursor-pointer transition-all hover:bg-amber justify-center items-center gap-x-2  font-medium w-[90%]  rounded-xl shadow-xl h-10"} ${
                        location === prevLocation &&
                        location !== null &&
                        prevLocation !== null
                            ? "bg-amber-400 transition-all scale-95"
                            : "bg-gray-200 "
                    }`}
                >
                    {location || prevLocation ? (
                        <Fragment>
                            {location || prevLocation}
                            <MdLocationOn />
                        </Fragment>
                    ) : (
                        <MdNotListedLocation className=' text-3xl' />
                    )}
                </div>
            </div>
            {/* {isOpen ? (
                events.map((event, index) => {
                    if (!uniqueLocations.has(event.location)) {
                        uniqueLocations.add(event.location);
                        return (
                            <div
                                className='text-lg font-medium cursor-pointer h-10 px-5 flex flex-row justify-start items-center gap-4'
                                onClick={() => {
                                    setPrevLocation(event.location);
                                    setLocation(event.location);
                                }}
                                key={index}
                            >
                                {event.location}{" "}
                                {location || prevLocation ? (
                                    <div className='text-green-700'>
                                        <MdLocationOn />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            ) : (
                <LocationModal
                    setPrevLocation={setPrevLocation}
                    setLocation={setLocation}
                    events={events}
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                />
            )} */}
        </Fragment>
    );
}

export default LocatioFilter;
