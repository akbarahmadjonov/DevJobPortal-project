import { useState } from "react";
import "./TextInput.scss";


export const TextInput = ({children, style, forId, textarea,  rows, maxLength, wrapperStyle, required, type="text", min,max, defaultValue }) => {
  const [message, setMessage] = useState(defaultValue);

  const handleChange = evt => {
    setMessage(evt.target.value);
  };

  return (
    <div style={wrapperStyle} className="text-input-wrapper">
   {textarea ? <textarea defaultValue={defaultValue} required={required}  onChange={handleChange} maxLength={maxLength} rows={rows} id={forId} className={`text-area text-input ${message  && "text-input--move"}`}></textarea> : <input defaultValue={defaultValue}
   required={required}
    onChange={handleChange}
    style={style} className={`text-input ${message  && "text-input--move"}`} id={forId}  type={type}
    min={min} max={max} 
    />}
      <label className="text-label" for={forId}>
        {children}&nbsp;<span style={{color: "blue"}}>{required && "*"}</span>
      </label>
    </div>
  );
};
