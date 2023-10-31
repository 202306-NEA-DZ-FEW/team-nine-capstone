import React from "react";
import { MdOutlineInterests } from "react-icons/md";

import { interestList } from "@/lib/interestsList";

function InterestsFilter({
    allCategories,
    handleInterest,
    setUpdatedInterests,
    updatedInterests,
    setAllCategoris,
}) {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex flex-row justify-center mb-2 text-lg font-medium items-center w-48 border-b-2 gap-x-3 border-solid border-black '>
                {" "}
                Pick Your Interest <MdOutlineInterests />
            </div>
            <div
                onClick={() => {
                    setAllCategoris(!allCategories);
                }}
                className={`flex flex-row text-lg cursor-pointer hover:bg-orange-500 justify-center items-center gap-x-2 font-medium w-[90%] border-2 border-solid border-black rounded-md shadow-xl h-10 ${
                    allCategories
                        ? "bg-orange-500 transition-all scale-95 "
                        : ""
                }  `}
            >
                All
            </div>
            {interestList.map((interest) => (
                <div
                    key={interest.title}
                    className={`flex flex-row text-lg cursor-pointer transition-all hover:bg-orange-500 justify-center items-center gap-x-2 font-medium w-[90%] border-2 border-solid border-black rounded-md shadow-xl h-10 ${
                        !allCategories &&
                        updatedInterests.includes(interest.title)
                            ? "bg-orange-500 transition-all scale-95 "
                            : ""
                    } `}
                    onClick={() => {
                        setAllCategoris(null);
                        handleInterest(interest.title);
                    }}
                >
                    {interest.title}
                </div>
            ))}
        </div>
    );
}

export default InterestsFilter;
