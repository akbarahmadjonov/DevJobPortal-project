import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import userVector from "./../../Assets/Images/Vector.svg";
import schIco from "./../../Assets/Images/search.svg";

export default function Header({ headerClassName, style, inputStyle, loginTextColor} ) {
  return (
    <header style={style} className={headerClassName ? "home__header" : ""}>
      <div className="container max-w-[1728px] mx-auto p-[20px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-[90px] justify-between w-full">
            <h1 className="text-[#0050C8] text-[20px] font-bold">
              TheJobportal
            </h1>
            <ul
              style={{ fontFamily: "Lato, sans-serif" }}
              className=" flex items-center w-[30%] text-[14px] font-[Lato] justify-between  text-[#999FA8]"
            >
              <Link className="hover:text-blue-500 transition-all" to={"/"}>Home</Link>
              <Link className="hover:text-blue-500 transition-all" to={"/jobs"}>Jobs</Link>
              <Link className="hover:text-blue-500 transition-all" to={"/"}>FAQs</Link>
              <Link className="hover:text-blue-500 transition-all" to={"/"}>Support</Link>
              <Link className="hover:text-blue-500 transition-all" to={"/"}>About</Link>
            </ul>
            <div>
              <label
                className="flex items-center justify-between relative"
                htmlFor="search"
              >
                <input
                  style={inputStyle}
                  type="text"
                  id="search"
                  className="flex pl-[47px] outline-none focus:ring-2 transition-all rounded-sm focus:ring-blue-500 pr-[40px] text-[14px] font-normal w-[440px] py-[10px] text-[#999]  bg-[#dadddd3d]"
                  placeholder="Search"
                />
                <img
                  src={schIco}
                  alt="search Icon"
                  width={14}
                  height={14}
                  className="absolute right-[18px] cursor-pointer"
                />
              </label>
            </div>
            <div className="flex  items-center justify-start space-x-[10px]">
              <img src={userVector}  alt="userIcon" />
              <NavLink
                className={`active:text-black text-[${loginTextColor ? loginTextColor : "#c2c2c2"}]`}
                to={"/auth/register"}
              >
                Create account{" "}
              </NavLink>
              <span className="text-black">/</span>
              <NavLink
                className={`active:text-black text-[${loginTextColor ? loginTextColor : "#c2c2c2"}]`}
                to={"/auth/login"}
              >
                login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
