import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddApp } from "../../Redux/AppSlice";

export default function AppCard({ title, imgLink }) {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.Apps);
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => {
        // dispatch(AddApp({title, imgLink}));
        setSelected(!selected);
      }}
      className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
        selected
          ? "border-blue-400 bg-[#3a6fff0d]"
          : "border-[#ACB6C8] bg-white"
      }`}
    >
      <img src={imgLink} alt="skill" width={40} height={40} className={title} />
      <div className="text-center font-bold leading-4 ">{title}</div>
    </div>
  );
}
