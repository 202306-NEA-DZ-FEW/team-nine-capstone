import React from "react";
import { MdLocationOn } from "react-icons/md";

const LocationModal = ({
    isVisible,
    onClose,
    events,
    setLocation,
    setPrevLocation,
}) => {
    const uniqueLocations = new Set();
    if (!isVisible) return null;
    return (
        <div
            onClick={onClose}
            className='fixed z-10 w-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
        >
            <div className='w-[45%] flex flex-col rounded-lg object-cover '>
                <button
                    onClick={onClose}
                    className='text-gray-500 hover:text-white text-xl place-self-end border rounded-sm w-5 h-5 flex justify-center items-center bg-gray-50 mb-4 hover:bg-amber-500'
                >
                    X
                </button>
                <div className=' rounded-sm ring ring-amber-500 active:ring-2 active:ring-green-500'>
                    {events.map((event, index) => {
                        if (!uniqueLocations.has(event.location)) {
                            uniqueLocations.add(event.location);
                            return (
                                <div
                                    className='bg-gray-300 hover:bg-amber-500 text-lg font-medium cursor-pointer h-10 px-5 flex flex-row justify-start items-center gap-4 border-b-2'
                                    onClick={() => {
                                        setPrevLocation(event.location);
                                        setLocation(event.location);
                                        onClose();
                                    }}
                                    key={index}
                                >
                                    {event.location} <MdLocationOn />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
