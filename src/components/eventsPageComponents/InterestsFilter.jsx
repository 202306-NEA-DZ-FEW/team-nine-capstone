import React, { useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineInterests } from "react-icons/md";

import { interestList } from "@/lib/interestsList";

function InterestsFilter({
    isOpen,
    allCategories,
    handleInterest,
    updatedInterests,
    setAllCategoris,
}) {
    const [dropIsOpen, setDropisOpen] = useState(null);
    return (
        <div className='flex flex-col justify-center items-center w-full gap-2 px-1 my-3'>
            <div
                onClick={() => setDropisOpen((prev) => !prev)}
                className={`${
                    isOpen
                        ? ""
                        : " gap-x-3 cursor-pointer bg-gray-200 rounded-xl w-[70%] h-10 shadow-lg "
                } flex flex-row justify-center mb-2 text-lg font-medium items-center w-48  `}
            >
                {" "}
                Pick Your Interest <MdOutlineInterests className='md:hidden' />{" "}
                {dropIsOpen ? (
                    <BiSolidUpArrow className='hidden md:block' />
                ) : (
                    <BiSolidDownArrow className='hidden md:block' />
                )}
            </div>

            {dropIsOpen || isOpen ? (
                <div className='relative w-full'>
                    <div
                        className={`w-[90%] ${
                            dropIsOpen ? "absolute  w-full self-center" : ""
                        } bg-gray-200 my-4 max-h-40 flex flex-col gap-3 py-3 rounded-md px-2 scroll-m-4 md:border-none md:shadow-xl  overflow-hidden overflow-y-auto mt-2`}
                    >
                        <div
                            onClick={() => {
                                setAllCategoris(!allCategories);
                            }}
                            className={` flex flex-row  text-lg w-full  cursor-pointer ${
                                isOpen
                                    ? "justify-between "
                                    : "  hover:bg-amber-400 shadow-xl justify-center gap-x-2  rounded-md"
                            }   items-center font-medium w-[100%]  h-10 ${
                                !isOpen && allCategories
                                    ? "bg-amber-400 transition-all scale-95 "
                                    : " bg-gray-50 rounded"
                            }  `}
                        >
                            All {allCategories && isOpen ? <FcCheckmark /> : ""}
                        </div>
                        {interestList.map((interest) => (
                            <div
                                key={interest.title}
                                className={`flex flex-row text-lg cursor-pointer ${
                                    isOpen
                                        ? "justify-between "
                                        : " hover:bg-amber-400 shadow-xl justify-center gap-x-2 rounded-md"
                                }   items-center  font-medium w-[100%] h-10 ${
                                    !isOpen &&
                                    !allCategories &&
                                    updatedInterests.includes(interest.title)
                                        ? "bg-amber-400 transition-all scale-95 "
                                        : " bg-gray-50 rounded-md"
                                } `}
                                onClick={() => {
                                    setAllCategoris(null);
                                    handleInterest(interest.title);
                                }}
                            >
                                {interest.title}{" "}
                                {!allCategories &&
                                isOpen &&
                                updatedInterests.includes(interest.title) ? (
                                    <FcCheckmark />
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default InterestsFilter;
