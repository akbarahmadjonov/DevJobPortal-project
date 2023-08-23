import { useEffect, useState } from "react"
import "./DropDownMenu.scss"

export const DropDownMenu = ({ roleRef, options, labelText })=>{

  const [openDropdown, setOpenDropdown] = useState(false)
  const [role, setRole] = useState(options && options[0])


  // console.log(role);

  //This code allows to close the dropdown menu, while clicking outside of the dropdown 
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (!roleRef?.current?.contains(evt.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [roleRef]);


//Getting value from dropdown menu
  const handleClick = (value) => {
    setRole(value)
  }

  return <div 
  className="dropdown-menu__input-wrapper">
  <input value={role} onClick={()=>setOpenDropdown(!openDropdown)} className="dropdown-menu__text-input" id="roleTextInput" required="required"/>
     <label className="dropdown-menu__text-label" htmlFor="roleTextInput">{labelText}
       &nbsp;<span style={{color: "blue"}}>*</span>
     </label>
     {openDropdown && <ul 
     ref={roleRef} 
     className="dropdown-menu__list">{
      options?.map((item, index)=>(
         <li
         onClick={() => {
           handleClick(item)
           setOpenDropdown(false)
         }}
         key={index} 
         className="dropdown-menu__item">
{item}
 </li>
       ))
     }
     </ul>}
   </div>
}