import { Link } from "react-router-dom";
import "./BlueButton.scss";

export const BlueButton = ({loading, to, children, type = "submit", style }) => {
  if (to)
    return (
      <Link to={to} style={style} className="blue-button">
        {children}
      </Link>
    );
  return (
    <button type={type} style={style} className={`blue-button ${loading && "blue-button--loading"}`}>
      {loading ? "Loading..." : children}
    </button>
  );
};
  