import { Link } from "react-router-dom"
import "./DevProfile.scss"


export const DevProfile = ()=>{
return  <div>

  <header className="dev-profile__header dev-profile__header-container">
    <div className="dev-profile__header-left-wrapper">
    <p className="dev-profile__header-logo">
        TheJobportal
                </p>
                <label htmlFor="devProfileSearch" className="dev-profile__header-label">
                <input placeholder="Search by skill or job position" className="dev-profile__header-search-input" type="text" name="" id="devProfileSearch" />
                </label>
    </div>
 
                <div className="dev-profile__header-right-wrapper">
                <nav className="dev-profile__nav">
                  <ul className="dev-profile__nav-list">
                    <li className="dev-profile__nav-item dev-profile__nav-item-1">
                      <Link>Jobs</Link>
                    </li>
                    <li className="dev-profile__nav-item dev-profile__nav-item-2">
                      <Link>Assessment</Link>
                    </li>
                  </ul>
                </nav>
                <div className="dev-profile__account-wrapper">
                    <div className="dev-profile__account-image">B</div>
                    <div className="dev-profile__account-inner-wrapper">
                    <p className="dev-profile__account-name">Ben Ali</p>
                    <p className="dev-profile__account-email">mayinpars@gmail.com</p>
                    </div>
                  </div>
                </div>
           

  </header>
</div>
}