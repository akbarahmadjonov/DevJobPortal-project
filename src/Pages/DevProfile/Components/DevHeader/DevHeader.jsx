import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { DevActions } from "../../../../Redux/DeveloperSlice"
import "./DevHeader.scss"
// import {useState} from "react"


export const DevHeader = ({style})=>{

  const menuRef = useRef(null) //for menu in header
  const [menu, setMenu] = useState(false);

  const {userData} = useSelector((state)=>state.user)


  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (!menuRef?.current?.contains(evt.target)) {
        setMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return  <header style={style} className="dev-profile__header">
  <div className="dev-profile__header-container">
  <div className="dev-profile__header-left-wrapper">
  <Link to={"/"} className="dev-profile__header-logo">
      TheJobportal
              </Link>
              <label htmlFor="devProfileSearch" className="dev-profile__header-label">
              <input placeholder="Search by skill or job position" className="dev-profile__header-search-input" type="text" name="" id="devProfileSearch" />
              </label>
  </div>
              <div className="dev-profile__header-right-wrapper">
              <nav className="dev-profile__nav">
                <ul className="dev-profile__nav-list">
                  <li className="dev-profile__nav-item">
                    <Link className="dev-profile__navigation-link" to={"/jobs"}>Jobs</Link>
                  </li>
                  <li className="dev-profile__nav-item">
                    <Link className="dev-profile__navigation-link">Assessment</Link>
                  </li>
                  <li className="dev-profile__nav-item">
                    <Link 
                    to={"/dev-profile/applied"}
                    className="dev-profile__navigation-link">Applied </Link>
                  </li>
                </ul>
              </nav>
              <div onClick={()=>setMenu(!menu)} className="dev-profile__account-wrapper">
                 {userData?.profilePicture ? <img style={{borderRadius: "50%"}} width={30} height={30} className="dev-profile_general-picture-header" src={userData?.profilePicture} alt="profile" /> : <div className="dev-profile__account-image">A</div>}
                  <div className="dev-profile__account-inner-wrapper">
                  <p className="profile-name">{userData?.fullName}</p>
                  <p className="profile-email">{userData?.email}</p>
                  </div>
                 {menu && 
                 <div 
                 className="dev-profile__menu">
                  <ul  
              ref={menuRef}
                  className="dev-profile__menu-list">
                    <li 
                    className="dev-profile__menu-item">
                      <Link  className="dev-profile__menu-link" to={"/dev-profile"}>My profile</Link>
                    </li>
                    <li className="dev-profile__menu-item">
                      <Link 
                      className="dev-profile__menu-link">My Contact</Link>
                    </li>
                    <li className="dev-profile__menu-item">
                      <Link className="dev-profile__menu-link">Referral</Link>
                    </li>
                    <li className="dev-profile__menu-item">
                      <Link
                      type="button"
                      className="dev-profile__menu-link" 
                      onClick={()=>{
                        localStorage.clear()
                      }}
                      to={"/"} 
                      >Log out</Link>
                    </li>
                  </ul>
                </div>}
                </div>
              
            
    
              </div>

  </div>
</header>
}