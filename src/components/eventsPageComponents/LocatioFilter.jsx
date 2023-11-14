import { useTranslation } from "next-i18next";
import React from "react";
import { Fragment } from "react";
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
    const { t } = useTranslation();
    return (
        <Fragment>
            <div className='flex flex-col gap-3 justify-center items-center'>
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
        </Fragment>
    );
}

export default LocatioFilter;
