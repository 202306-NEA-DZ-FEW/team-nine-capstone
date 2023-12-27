import React from "react";

import DateFilter from "./DateFilter";
import InterestsFilter from "./InterestsFilter";
import LocatioFilter from "./LocatioFilter";

function BottomSheet({
    setLocationSearch,
    locationSearch,
    handleSearch,
    prevLocation,
    setPrevLocation,
    setLocation,
    location,
    events,
    handleLocation,
    onClick,
    upDatedDate,
    filterType,
    isOpen,
    onClose,
    allCategories,
    setAllCategoris,
    setUpdatedInterests,
    updatedInterests,
    handleInterest,
}) {
    const sheetStyles = isOpen ? "translate-y-0" : "translate-y-full"; // Use Tailwind CSS classes for transition
    return (
        <div
            className={`fixed h-80 rounded-t-lg bottom-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ${sheetStyles}`}
        >
            <div
                className='flex justify-center h-5 cursor-pointer'
                onClick={onClose}
            >
                <div className=' mt-0 w-[30%] h-2 text-center bg-gray-400 hover:bg-black rounded-xl'></div>
            </div>
            <div className='p-1 h-full'>
                <div className='h-72 scroll-m-4 overflow-y-auto mt-2'>
                    {filterType === "interest" ? (
                        <InterestsFilter
                            isOpen={isOpen}
                            allCategories={allCategories}
                            setAllCategoris={setAllCategoris}
                            setUpdatedInterests={setUpdatedInterests}
                            updatedInterests={updatedInterests}
                            handleInterest={handleInterest}
                        />
                    ) : filterType === "location" ? (
                        <LocatioFilter
                            setLocationSearch={setLocationSearch}
                            locationSearch={locationSearch}
                            handleSearch={handleSearch}
                            prevLocation={prevLocation}
                            setPrevLocation={setPrevLocation}
                            setLocation={setLocation}
                            location={location}
                            events={events}
                            handleLocation={handleLocation}
                            isOpen={isOpen}
                        />
                    ) : filterType === "date" ? (
                        <DateFilter
                            isOpen={isOpen}
                            upDatedDate={upDatedDate}
                            onClick={onClick}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default BottomSheet;
