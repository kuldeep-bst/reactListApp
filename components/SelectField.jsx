import React from "react";

export default function SelectField({
  label,
  name,
  id,
  onChange,
  error,
  value,
  defaultOption,
  options,
}) {
  return (
    <div className="input-container">
      <label htmlFor={label}>Category</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="" hidden>
          {defaultOption}
        </option>
        {options.map((opt) => (
          <option key={crypto.randomUUID()} value={opt}>
            {opt}
          </option>
        ))}
        {/* <option value="Grocery">Grocery</option>
        <option value="Clothes">Clothes</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
        <option value="Medicine">Medicine</option> */}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
