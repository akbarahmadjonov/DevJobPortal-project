import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {  ChangeApp } from "../../Redux/AppSlice";

export default function AppCard({ title, imgLink,  }) {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.Apps);
  const app = apps.find((app) => app.title === title);
  const [thisSelect, setThisSelect] = useState(app.selected);

  const handleCardClick = () => {
    const updatedSelect = !thisSelect; // Toggle the selection
    setThisSelect(updatedSelect);
    dispatch(ChangeApp({ title, imgLink, selected: updatedSelect }));
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
        thisSelect
          ? "border-blue-400 bg-[#3a6fff0d]"
          : "border-[#ACB6C8] bg-white"
      }`}
    >
      <img src={imgLink} alt="skill" width={40} height={40} className={title} />
      <div className="text-center font-bold leading-4 ">{title}</div>
    </div>
  );
}
