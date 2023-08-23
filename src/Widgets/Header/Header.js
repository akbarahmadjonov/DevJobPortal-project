import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import userVector from "./../../Assets/Images/Vector.svg";
import schIco from "./../../Assets/Images/search.svg";
import { Button } from "@mui/material";

export default function Header({ headerClassName, style, inputStyle }) {
  const verify = localStorage.getItem("verify") || false;
  const user = localStorage.getItem("userData");
  const fullName = JSON.parse(user && user)?.fullName;
  const navigate = useNavigate();
  return (
    <>
      {verify ? (
        <header style={style} className={headerClassName ? "home__header" : ""}>
          <div
            className="container max-w-[1728px] mx-auto p-[20px]"
            style={{ padding: "20px" }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-[90px] justify-between w-full">
                <p className="text-[#0050C8] text-[20px] font-bold">
                  TheJobportal
                </p>
                <ul
                  style={{ fontFamily: "Lato, sans-serif" }}
                  className=" flex items-center w-[30%] text-[14px] font-[Lato] justify-between  text-[#999FA8]"
                >
                  <li>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/jobs"}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      About
                    </Link>
                  </li>
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
                  <img src={userVector} alt="userIcon" />
                  <NavLink
                    style={verify && { color: "#b2b7bd" }}
                    className={`active:text-blue-500 text-black font-bold`}
                    to={"/user/login"}
                  >
                    {fullName ? fullName : "Unknown User"}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header style={style} className={headerClassName ? "home__header" : ""}>
          <div
            className="container max-w-[1728px] mx-auto p-[20px]"
            style={{ padding: "20px" }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-[90px] justify-between w-full">
                <h1 className="text-[#0050C8] text-[20px] font-bold">
                  TheJobportal
                </h1>
                <ul
                  style={{ fontFamily: "Lato, sans-serif" }}
                  className=" flex items-center w-[30%] text-[14px] font-[Lato] justify-between  text-[#999FA8]"
                >
                  <Link className="hover:text-blue-500 transition-all" to={"/"}>
                    Home
                  </Link>
                  <Link
                    className="hover:text-blue-500 transition-all"
                    to={"/jobs"}
                  >
                    Jobs
                  </Link>
                  <Link className="hover:text-blue-500 transition-all" to={"/"}>
                    FAQs
                  </Link>
                  <Link className="hover:text-blue-500 transition-all" to={"/"}>
                    Support
                  </Link>
                  <Link className="hover:text-blue-500 transition-all" to={"/"}>
                    About
                  </Link>
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
                <div className="flex items-center justify-center space-x-[10px]">
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => navigate("/user/register")}
                  >
                    I'm a developer{" "}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate("/company/register")}
                  >
                    Hire developers
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
