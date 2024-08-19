import React from "react";

export default function Textfield({ label, name, id, onChange, error, value }) {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input id={id} name={name} value={value} onChange={onChange} />
      <p className="error">{error}</p>
    </div>
  );
}
