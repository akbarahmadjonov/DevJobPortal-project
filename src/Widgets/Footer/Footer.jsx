import { React } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";


export const Footer = ()=>{

  const handleSubmitSub = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("emailForSub"),
    });
  };


return <footer className="relative w-full bg-white">
  <div className="flex flex-col space-y-[20px] py-[80px] absolute w-full top-[1200px]">
    <div className="flex justify-between mb-[84px] items-center w-full">
      <div className="flex flex-col items-start w-[50%]">
        <h2 className="text-[24px] text-black font-semibold ">
          Subscribe to our newslettter
        </h2>
        <p className=" text-[16px] font-normal text-[#999]">
          Get informed on every update
        </p>
      </div>
      <div className="max-w-[50%] text-[16px] w-[602px]  flex items-end ">
        <form onSubmit={handleSubmitSub} className="w-full">
          <label
            className="flex w-full text-[16px]"
            htmlFor="emailForSub"
          >
            <TextField
              required
              fullWidth
              type="email"
              id="emailForSub"
              label="Your email address"
              name="emailForSub"
              style={{ color: "#999", textSize: "16px" }}
              autoComplete="email"
            />
            <button
              type="submit"
              className="w-[30%] py-[10px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-sm"
            >
              Subscribe
            </button>
          </label>
        </form>
      </div>
    </div>
    <hr className="bg-[#0050c81a] flex " />
    {/*  */}
    <div className="flex space-x-[190px]   pt-[55px] items-start">
      <div>
        <h1 className="text-[#0050C8] text-[20px] font-bold">
          TheJobportal
        </h1>
      </div>
      <div className="flex space-x-[170px] pt-[10px]">
        <div>
          <h2 className="text-black text-[20px] mb-[14px] font-normal">
            Sitemap
          </h2>
          <ul
            style={{ fontFamily: "Lato, sans-serif" }}
            className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
          >
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Jobs
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              FAQs
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Support
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              About
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-black text-[20px] mb-[14px] font-normal">
            FAQs
          </h2>
          <ul
            style={{ fontFamily: "Lato, sans-serif" }}
            className=" flex flex-col items-start w-full text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
          >
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              How can I search for a specific job ?
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Are there freelance jobs ?
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Can I post a jobs also
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-black text-[20px] mb-[14px] font-normal">
            Contact us
          </h2>
          <ul
            style={{ fontFamily: "Lato, sans-serif" }}
            className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
          >
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Github
            </Link>
            <Link
              className="hover:text-blue-500 transition-all"
              to={"/"}
            >
              Twitter
            </Link>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex w-full items-center pt-[197px] justify-center">
      <a
        href="#!"
        className="text-[#2F2F2F] text-[16px] font-normal "
        target="_blank"
      >
        Developer and maintained by{" "}
        <span className="hover:text-blue-500 transition-all">
          {" "}
          Regis
        </span>
      </a>
    </div>
  </div>
</footer>
}