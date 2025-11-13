import React from 'react';
import { FaFilter } from "react-icons/fa";

const Button = ({ size, btnName, type, disabled }) => {
    return (
        <button
            type={type}
            className={`${size ? size : "w-full mt-6"} ${disabled ? 'cursor-not-allowed bg-slate-400' : "cursor-pointer bg-black"} text-white text-base rounded-lg px-4 hover:scale-105 duration-300`}
            disabled={disabled}
        >
            <span className='flex items-center justify-center gap-1'>
                {btnName === "Filter" && <FaFilter />} {btnName}
            </span>
        </button>
    );
};

export default Button;
