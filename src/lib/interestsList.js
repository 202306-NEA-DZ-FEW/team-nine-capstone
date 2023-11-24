import React from "react";
import { AiOutlineGlobal, AiOutlineRead, AiOutlineStock } from "react-icons/ai";
import { BiSolidTreeAlt } from "react-icons/bi";
import {
    BsFillCloudSunFill,
    BsFillHeartPulseFill,
    BsGenderAmbiguous,
    BsPeace,
} from "react-icons/bs";
import { FaCity, FaFish, FaIndustry } from "react-icons/fa";
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { LuEqualNot } from "react-icons/lu";
import { MdFamilyRestroom, MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { PiBowlFood, PiInfinity, PiUniteFill } from "react-icons/pi";

export const interestList = [
    {
        title: "no Poverty",
        src: "/globalGoalsLogos/1.png",
        color: "rose",
        icon: <MdFamilyRestroom />,
    },
    {
        title: "zero Hunger",
        src: "/globalGoalsLogos/2.png",
        color: "yellow",
        icon: <PiBowlFood />,
    },
    {
        title: "good Health",
        src: "/globalGoalsLogos/3.png",
        color: "green",
        icon: <BsFillHeartPulseFill />,
    },

    {
        title: "gender Equality",
        src: "/globalGoalsLogos/5.png",
        color: "red",
        icon: <BsGenderAmbiguous />,
    },
    {
        title: "clean Water",
        src: "/globalGoalsLogos/6.png",
        color: "cyan",
        icon: <FaGlassWaterDroplet />,
    },
    {
        title: "clean Energy",
        src: "/globalGoalsLogos/7.png",
        color: "yellow",
        icon: <MdOutlineEnergySavingsLeaf />,
    },
    {
        title: "decent Work",
        src: "/globalGoalsLogos/8.png",
        color: "rose",
        icon: <AiOutlineStock />,
    },
    {
        title: "quality Education",
        src: "/globalGoalsLogos/4.png",
        color: "red",
        icon: <AiOutlineRead />,
    },
    {
        title: "inovation",
        src: "/globalGoalsLogos/9.png",
        color: "orange",
        icon: <FaIndustry />,
    },
    {
        title: "reduced In Equalities",
        src: "/globalGoalsLogos/10.png",
        color: "pink",
        icon: <LuEqualNot />,
    },
    {
        title: "sustainable Cities",
        src: "/globalGoalsLogos/11.png",
        color: "orange",
        icon: <FaCity />,
    },
    {
        title: "responsible Consumption",
        src: "/globalGoalsLogos/12.png",
        color: "yellow",
        icon: <PiInfinity />,
    },
    {
        title: "climate Action",
        src: "/globalGoalsLogos/13.png",
        color: "emerald-950",
        icon: <BsFillCloudSunFill />,
    },
    {
        title: "life Below Water",
        src: "/globalGoalsLogos/14.png",
        color: "blue",
        icon: <FaFish />,
    },
    {
        title: "life On Land",
        src: "/globalGoalsLogos/15.png",
        color: "lime",
        icon: <BiSolidTreeAlt />,
    },
    {
        title: "global",
        src: "/globalGoalsLogos/Rounded.png",
        color: "black",
        icon: <AiOutlineGlobal />,
    },
    {
        title: "peace",
        src: "/globalGoalsLogos/16.png",
        color: "blue",
        icon: <BsPeace />,
    },
    {
        title: "partnership",
        src: "/globalGoalsLogos/17.png",
        color: "indigo",
        icon: <PiUniteFill />,
    },
];
