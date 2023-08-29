import { Link } from "react-router-dom";
import "./BlueButton.scss";

export const BlueButton = ({loading, to, children, type = "submit", style, disabled }) => {
  if (to)
    return (
      <Link to={!disabled && to} style={style} className={`blue-button ${disabled && "blue-button--disabled"}`}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} type={type} style={style} className={`blue-button ${loading && "blue-button--loading"}`}>
      {loading ? "Loading..." : children}
    </button>
  );
};
  