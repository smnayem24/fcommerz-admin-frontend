import React from "react";

const Checkbox = ({ id, name, labelText, onChange, value }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        checked={value}
      />
      <label htmlFor={id}> {labelText}</label>
    </div>
  );
};

export default Checkbox;
