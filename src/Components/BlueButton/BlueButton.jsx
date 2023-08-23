import { Link } from "react-router-dom";
import "./BlueButton.scss";

export const BlueButton = ({ to, children, type = "submit", style }) => {
  if (to)
    return (
      <Link to={to} style={style} className="blue-button">
        {children}
      </Link>
    );
  return (
    <button type={type} style={style} className="blue-button">
      {children}
    </button>
  );
};
