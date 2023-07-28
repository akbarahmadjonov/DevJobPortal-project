import { Link } from "react-router-dom";
import userVector from "./../../Assets/Images/Vector.svg";
import searchIcon from "../../Assets/Icons/search.svg";

export default function Header({ headerClassName, style, authStyle }) {
  return (
    <header style={style} className={headerClassName ? "home__header" : ""}>
      <div className="max-w-[1440px] mx-auto p-[20px]">
        <div className="container flex items-center justify-between w-full">
          <div className="flex items-center space-x-[90px] justify-between w-full">
            <h1 className="text-[#0050C8] text-[20px] font-bold">
              TheJobportal
            </h1>
            <ul className=" flex items-center w-[30%]  justify-between  text-[#999FA8]">
              <Link to={"/"}>Home</Link>
              <Link to={"/"}>Jobs</Link>
              <Link to={"/"}>FAQs</Link>
              <Link to={"/"}>Support</Link>
              <Link to={"/"}>About</Link>
            </ul>
            <input
              id="header__search-input"
              type="text"
              className="header__search-input flex px-[15px] w-[320px] py-[10px] bg-[#DADDDD]"
              placeholder="Search"
            />

            <div className="flex  items-center justify-start space-x-[10px]">
              <img src={userVector} alt="userIcon" />
              <Link style={authStyle} to={"/auth"}>
                Create account&nbsp;
              </Link>
              <Link to={"/auth/login"}>/&nbsp;login</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
