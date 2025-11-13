import React from "react";

const Input = ({ labelText, type, placeholder, onChange, value, name }) => {
  return (
    <>
      <label className="flex justify-start text-gray-700">{labelText}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full px-4 py-3 rounded-lg mt-2 border border-primary focus:border-gray-500 focus:bg-white focus:outline-none"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
