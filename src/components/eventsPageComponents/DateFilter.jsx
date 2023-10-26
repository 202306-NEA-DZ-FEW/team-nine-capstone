import dayjs from "dayjs";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";

const DateFilter = ({ onClick }) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    return (
        <div className='flex justify-center items-center my-4'>
            <div className='w-[90%] h-auto border rounded-lg  shadow-md'>
                <div className='flex py-3 md:justify-between justify-center items-center px-6 rounded-t-lg bg-amber-500'>
                    <div className='hidden md:grid md:grid-flow-col w-[80%] justify-items-stretch'>
                        <GrFormPrevious
                            className='w-[40%] h-5 flex items-center cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1 className='h-3 w-[20%] flex items-center pt-2 whitespace-nowrap select-none font-semibold '>
                            {months[today.month()]} {today.year()}
                        </h1>
                        <GrFormNext
                            className='w-[40%] flex items-center h-5 cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                    <div className=' flex gap-1 md:gap-7 items-center md:justify-end justify-center w-[20%]'>
                        <h1
                            className='font-bold cursor-pointer hover:scale-105 transition-all'
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                    </div>
                </div>
                <div className='grid grid-cols-7 px-2 '>
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className=' text-sm text-center underline h-8 font-bold grid place-content-center text-gray-500 select-none'
                            >
                                {day}
                            </h1>
                        );
                    })}
                </div>

                <div className=' grid grid-cols-7 px-2'>
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today }, index) => {
                            return (
                                <div
                                    key={index}
                                    className='p-2 text-center h-8 grid place-content-center text-sm border-t'
                                >
                                    <h1
                                        className={cn(
                                            currentMonth ? "" : "text-gray-400",
                                            today
                                                ? "bg-amber-500 text-white"
                                                : "",
                                            selectDate
                                                .toDate()
                                                .toDateString() ===
                                                date.toDate().toDateString()
                                                ? "bg-black text-white"
                                                : "",
                                            "h-7 w-7 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
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
        </div>
    );
};

export default DateFilter;
