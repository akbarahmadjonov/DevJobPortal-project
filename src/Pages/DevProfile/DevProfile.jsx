import { useState } from "react";
import { Link } from "react-router-dom"
import "./DevProfile.scss"
import editPen from "../../Assets/Icons/edit-pen.svg"


export const DevProfile = ()=>{

  
  const [applyFile, setApplyFile] = useState(null)

  const handleFileUpload = async (evt) => {
    if (evt.target.files) {
      setApplyFile(evt.target.files[0]);
    }
  };



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
  <main className="dev-profile__main">
    <section className="dev-profile__info-section-container dev-profile__info-section">
    <p className="dev-profile__dev-name">{`Wellcome, Ben`}</p>
    <div className="dev-profile__info-wrapper">
      <p className="dev-profile__title">Your Career Profile</p>
      <p className="dev-profile__text">Your Supercoder profile saves your info so you can to jobs quickly, receive personalized jobs recomendations.</p>
    </div>
    <div className="dev-profile__info-wrapper-2">
    <p className="dev-profile__title">Resume</p>
    <p className="dev-profile__text-2">To start your application, upload your resume in English in DOCX or PDF with a max size of 2 MB</p>
   <input onChange={handleFileUpload} accept=".pdf, .docx" type="file" id="selectedFile" style={{display: "none"}} />
<input className="dev-profile__upload" type="button" value="Upload resume" onClick={()=>{
  document.getElementById('selectedFile').click()
}} />
    </div>
    {/* General information - can be component*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">General information<span className="dev-profile__required">*</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/* Overall experience - can be component */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Overall experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Avaibility*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Avaibility<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Role and salary*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Role and Salary<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Skills and Languages */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Skills and languages<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Work experience */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Work experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
       {/*Education */}
       <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-3a">
    <p className="dev-profile__title">Education<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    <div className="dev-profile__input-wrapper">
    <input type="checkbox" name="" id="" /><p>I understand that the information I provide will be used in accordance with Supercoder's applicant and candidate privacy policy. I content the processing of my information as described in the policy including the, unlimited circumstances, Supercoder may share my contact information with
trusted parties, to assist in certain phases of the hiring process (such as conducting
ducting background checks).</p>
    </div>
    </section>
  </main>
  {/* Modals */}
  <div className="dev-profile__general-modal">
    <div className="dev-profile__general-modal-wrapper">
    <div className="dev-profile__general-modal-content">
      {/* <p className="">General information</p> */}
    </div>
    </div>
  </div>
</div>
}