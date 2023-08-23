
import Logo from "./../../../../Assets/Images/SuperCoderLogoForDeveloper.svg";
import mainImg from "../../../Assets/Images/authenticate-img.svg";


const LeftContent = () => {
  return (
    <div className="w-full  text-white">
      <img
        src={Logo}
        width={70}
        height={41}
        className="mb-[60px]"
        alt="site-logo"
      />
      <h2 className="mb-[25px] leading-tight text-[22px] font-bold ">
        Upgrade your life with a global tech HR platform
      </h2>
      <p className="tracking-tight leading-tight">
        Access to a wide range of remote jobs, allowing for a better work-life
        balance, increased productivity, and reduced stress levels. Join today
        and start experiencing the benefits of remote work.
      </p>
      <img
        src={mainImg}
        alt="creative_image"
        className="w-[420px] absolute bottom-[75px] h-[305px]"
      />
    </div>
  );
};
