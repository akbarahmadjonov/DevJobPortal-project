import { useEffect, useState } from "react"
import "./DropDownMenu.scss"

export const DropDownMenu = ({ menuRef, options, labelText, fixLabel, placeholder, forId, defaultValue })=>{

  const [openDropdown, setOpenDropdown] = useState(false)

  //Should come from outside
  const [value, setValue] = useState()


  // console.log(value);

  //Handles

  //This code allows to close the dropdown menu, while clicking outside of the dropdown 


  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (!menuRef?.current?.contains(evt.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [menuRef]);


//Getting value from dropdown menu
  const handleClick = (value) => {
    setValue(value)
  }

  return <div 
className="dropdown-menu__input-wrapper">
  {
    fixLabel && <label className="dropdown-menu__text-label-fixed" htmlFor={forId}>{labelText}
    &nbsp;<span style={{color: "blue"}}>*</span>
  </label>
  }
<input defaultValue={defaultValue} autocomplete="off"  placeholder={placeholder} value={value} onClick={()=>setOpenDropdown(!openDropdown)} className="dropdown-menu__text-input" id={forId} required="required"/>
{  !fixLabel &&
   <label className="dropdown-menu__text-label" htmlFor={forId}>{labelText}
     &nbsp;<span style={{color: "blue"}}>*</span>
   </label>}
   {openDropdown && <ul 
   ref={menuRef} 
   className="dropdown-menu__list">{
    options?.map((item, index)=>(
       <li
       onClick={() => {
         handleClick(item.jobName)
         setOpenDropdown(false)
       }}
       key={index} 
       className="dropdown-menu__item">
{item.jobName}
</li>
     ))
   }
   </ul>}
 </div>



}


//Version with seach, doesn't work:


// return <div 
// className="dropdown-menu__input-wrapper">
//    {label && <label className="dropdown-menu__text-label-1" htmlFor="roleTextInput">{labelText}&nbsp;{required && <span style={{color: "blue"}}>*</span>}</label>}
// <input  value={value} onClick={()=>setOpenDropdown(!openDropdown)} className="dropdown-menu__text-input" id="roleTextInput" required="required"/>
//   {!label && <label className="dropdown-menu__text-label" htmlFor="roleTextInput">{labelText}
//      &nbsp;<span style={{color: "blue"}}>*</span>
//    </label> }
//    {openDropdown &&
//     <ul 
//   tabIndex="-1"
//    ref={menuRef} 
//    className="dropdown-menu__list">
//     <li>{searchable &&
//     <input onChange={handleSearchText} placeholder="Search" className="dropdown-menu__input-search" type="text" />}</li>
//     {
//     options?.map((item, index)=>(
//        <li
//        onClick={() => {
//          handleClick(item)
//          setOpenDropdown(false)
//        }}
//        key={index} 
//        className="dropdown-menu__item">
// {item}
// </li>
//      ))
//    }
//    </ul>
//    }
//  </div>

