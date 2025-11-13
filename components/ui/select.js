import React from "react";

const Select = ({ labelText, onChange, value, options }) => {
  return (
    <>
      <label className="flex justify-start text-gray-700">{labelText}</label>
      <select
        className="w-full px-4 py-3 rounded-lg mt-2 border border-primary focus:border-gray-500 focus:bg-white focus:outline-none"
        onChange={onChange}
        value={value}
      >
        <option value={""}>Select option</option>
        {options?.map((item, idx) => (
          <option key={idx} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
