import "./TextInput.scss";


export const TextInput = ({children, style, forId, textarea, typeNumber, rows, maxLength, wrapperStyle, required = true, type="text"}) => {
  return (
    <div style={wrapperStyle} className="text-input-wrapper">
   {textarea ? <textarea maxLength={maxLength} rows={rows} id={forId} required="required" className="text-area text-input"></textarea> : <input style={style} className="text-input" id={forId} required="required" type={type}/>}
      <label className="text-label" for={forId}>
        {children}&nbsp;<span style={{color: "blue"}}>{required && "*"}</span>
      </label>
    </div>
  );
};
