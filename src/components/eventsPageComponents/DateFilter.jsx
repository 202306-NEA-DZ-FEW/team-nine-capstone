import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";

const DateFilter = ({ onClick, upDatedDate, isOpen }) => {
    const { t } = useTranslation("common");

    const days = ["Su", "M", "Th", "W", "Tu", "F", "Sa"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {isOpen ? (
                <div className='flex flex-row justify-center text-lg font-medium self-center'>
                    {t("eventList.change date")}
                </div>
            ) : (
                ""
            )}
            <div className='flex w-[90%] justify-center items-center my-4'>
                {isOpen ? (
                    <GrFormPrevious
                        className='w-[10%] h-5 flex items-center cursor-pointer hover:scale-105 transition-all'
                        onClick={() => {
                            setToday(today.month(today.month() - 1));
                        }}
                    />
                ) : (
                    ""
                )}
                <div className='md:w-full lg:h-auto rounded-lg pb-2 border-none shadow-xl bg-gray-200'>
                    <div
                        className={`flex md:justify-between ${
                            isOpen
                                ? " h-auto flex items-center justify-center  "
                                : "  bg-amber-400 shadow-md m-4 rounded-md "
                        }  xl:flex-row md:flex-col py-3 justify-center items-center lg:px-4 rounded-t-lg `}
                    >
                        <div className=' md:grid md:grid-flow-col xl:w-[80%] text-sm w-full justify-items-stretch '>
                            <GrFormPrevious
                                className={`w-auto ${
                                    isOpen ? "hidden" : ""
                                } h-5 flex items-center font-medium cursor-pointer hover:scale-105 transition-all`}
                                onClick={() => {
                                    setToday(today.month(today.month() - 1));
                                }}
                            />
                            <div className='flex justify-center'>
                                <h1 className='h-3 lg:w-[20%] md:w-[20%] flex justify-center items-center pt-2 whitespace-nowrap text-lg select-none font-semibold '>
                                    {t(months[today.month()])} {today.year()}
                                </h1>
                            </div>

                            <GrFormNext
                                className={`w-auto ${
                                    isOpen ? "hidden" : ""
                                } h-5 flex items-center font-medium cursor-pointer hover:scale-105 transition-all`}
                                onClick={() => {
                                    setToday(today.month(today.month() + 1));
                                }}
                            />
                        </div>
                        <div
                            className={` ${
                                isOpen ? "hidden" : ""
                            } flex gap-1 md:gap-7 items-center md:justify-end justify-center w-[20%]`}
                        >
                            <h1
                                className='font-bold cursor-pointer hover:scale-105 transition-all'
                                onClick={() => {
                                    setToday(currentDate);
                                }}
                            >
                                {t("dateFilter.Today")}
                            </h1>
                        </div>
                    </div>
                    <div className='grid grid-cols-7 px-2 place-items-center'>
                        {days.map((day, index) => {
                            return (
                                <h1
                                    key={index}
                                    className='w-1/6 text-sm text-center underline h-8 font-bold grid place-content-center text-gray-500 select-none'
                                >
                                    {t(day)}
                                </h1>
                            );
                        })}
                    </div>

                    <div className=' grid grid-cols-7 px-2 place-items-center'>
                        {generateDate(today.month(), today.year()).map(
                            ({ date, currentMonth, today }, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='w-1/6 p-2 text-center h-6 grid place-content-center text-sm '
                                    >
                                        <h1
                                            className={cn(
                                                currentMonth
                                                    ? ""
                                                    : "text-gray-400",
                                                today
                                                    ? "bg-black text-white"
                                                    : "",
                                                upDatedDate &&
                                                    selectDate
                                                        .toDate()
                                                        .toDateString() ===
                                                        date
                                                            .toDate()
                                                            .toDateString()
                                                    ? "bg-amber-400 text-white"
                                                    : "",
                                                "lg:h-7 lg:w-7 w-6 h-6 rounded-full grid place-content-center hover:bg-amber-400 hover:text-white transition-all cursor-pointer select-none"
                                            )}
                                            onClick={() => {
                                                setSelectDate(date);
                                                onClick(date);
                                            }}
                                        >
                                            {date.date()}
                                        </h1>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                {isOpen ? (
                    <GrFormNext
                        className='w-[10%] flex items-center h-5 cursor-pointer hover:scale-105 transition-all'
                        onClick={() => {
                            setToday(today.month(today.month() + 1));
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default DateFilter;
