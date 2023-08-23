import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import editPen from "../../Assets/Icons/edit-pen.svg"
import closeIcon from "../../Assets/Icons/close-button.svg"
import { BlueButton } from "../../Components/BlueButton/BlueButton";
import pictureIcon from "../../Assets/Icons/picture.svg"
import { TextInput } from "../../Components/TextInput";
import ReactFlagsSelect from 'react-flags-select';
import PhoneInput from 'react-phone-number-input'
import linkedin from "../../Assets/Icons/linkedin.svg"
import 'react-phone-number-input/style.css'
import "./DevProfile.scss"
import { DropDownMenu } from "../../Components";



export const DevProfile = ()=>{

  
  const [applyFile, setApplyFile] = useState(null) //upload resume
  const [applyImg, setApplyImg] = useState(null) //upload image
  const [imageUrl, setImageUrl] = useState(null); //preview image
  const [fileName, setFileName] = useState("")

  //Modals
  const [genModal, setGenModal] = useState(false)
  const [expModal, setExpModal] = useState(false)
  const [aviaModal, setAviaModal] = useState(false)
  const [roleModal, setRoleModal] = useState(false)
  const [skillsModal, setSkillsModal] = useState(false)
  //

  const [selectedNation, setSelectedNation] = useState("");
  const [selectedResidance, setSelectedResidance] = useState("");
  const [phone, setPhone] = useState()
  const [currentSalary, setCurrentSalary] = useState(0);

  // Input values

  //refs
const roleRef = useRef(null); //for role and salary dropdown
  //

  //Mock datas
  const jobsOptions = [
    "cloud engineer", "flutter developer", "web-designer", "ios developer", "admin"
  ]

  //

  //Variables
  
  //

  

  //
  //Handle

  const handleCurrentSalaryChange = (evt) => {
    const value = evt.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setCurrentSalary(value);
  };


  const handleFileUpload =  (evt) => {
    if (evt.target.files) {
      setApplyFile(evt.target.files[0]);
      setFileName(evt.target.files[0]?.name || "") 
    }
  };

  const handleImgUpload =  (evt) => {
    if (evt.target.files) {
      setApplyImg(evt.target.files[0]);
    } 

  };

  useEffect(() => {
    if (applyImg) {
      setImageUrl(URL.createObjectURL(applyImg));
    } 
    else {
      setImageUrl(null)
    }

  }, [applyImg]);


return  <div className="dev-profile">
  <header className="dev-profile__header dev-profile__header-container">
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
    <p className="dev-profile__text-2">{fileName ? fileName : "To start your application, upload your resume in English in DOCX or PDF with a max size of 2 MB"}</p>
   <input onChange={handleFileUpload} accept=".pdf, .docx" type="file" id="selectedFile" style={{display: "none"}} />
<input className="dev-profile__upload" type="button" value="Upload resume" onClick={()=>{
  document.getElementById('selectedFile').click()
}} />
    </div>
    {/* General information - can be component*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">General information<span className="dev-profile__required">*</span></p>
  <button onClick={()=>setGenModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/* Overall experience - can be component */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Overall experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setExpModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Avaibility*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Avaibility<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setAviaModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Role and salary*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Role and Salary<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setRoleModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Skills and Languages */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title">Skills and languages<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setSkillsModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
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
    <div  className="dev-profile__bottom">
    <div className="dev-profile__input-wrapper">
    <input type="checkbox" name="" id="" /><p>I understand that the information I provide will be used in accordance with Supercoder's applicant and candidate privacy policy. I content the processing of my information as described in the policy including the, unlimited circumstances, Supercoder may share my contact information with
trusted parties, to assist in certain phases of the hiring process (such as conducting
ducting background checks).</p>
    </div>
<BlueButton style={{padding: "8px 60px", borderRadius: 4, marginBottom: 20}}>Submit</BlueButton>
    </div>
    </section>
  </main>
  {/* Modals */}
  {/*General modal */}
  {genModal &&
  <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">General information</p>
    <button type="button" onClick={()=>setGenModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile-modal-body">
         {/*same title-1*/}
      <p className="dev-profile__general-modal-title">Profile picture<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <div className="dev-profile_general-modal-picture-wrapper"><img className="dev-profile_general-modal-picture" style={imageUrl && {borderRadius: "50%"}}  width={50} height={50} src={imageUrl ? imageUrl : pictureIcon} alt="preview image" /> 
      <input onChange={handleImgUpload} accept="image/jpg, image/jpeg, image/png" type="file" id="selectedFileImg" style={{display: "none"}} />
<input style={{color: "#0050c8", border: "1px solid #0050c8", backgroundColor: "transparent", padding: "3px 10px"}} className="dev-profile__upload" type="button"  value="Upload profile photo" onClick={()=>{
  document.getElementById('selectedFileImg').click()
}} />
<button onClick={()=>{
  setImageUrl(null)
  setApplyImg(null)
}
  } className="dev-profile__general-modal-delete-button">Delete profile photo</button>
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
      <TextInput forId={"firstNameInput"}>First name</TextInput>
      <TextInput forId={"lastNameInput"}>Last name</TextInput>
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
        <div className="select-flags-wrapper">
        <span className="select-flags-label">Nationality&nbsp;<span style={{color: "blue"}}>*</span></span>
      <ReactFlagsSelect  selected={selectedNation}
      onSelect={(code) => setSelectedNation(code)
      }
      placeholder=""
      searchable
      className="menu-flags"
      />
        </div>
<div className="select-flags-wrapper">
<span className="select-flags-label">Residance&nbsp;<span style={{color: "blue"}}>*</span></span>
<ReactFlagsSelect  selected={selectedResidance}
      onSelect={(code) => setSelectedResidance(code)
      }
      placeholder=""
      searchable
      className="menu-flags"
      />
</div>
      
      </div>
      <div className="dev-profile__general-modal-input-wrapper dev-profile__general-modal-input-wrapper-2">
      <PhoneInput
      
  international
  defaultCountry="KR"
  value={phone}
  onChange={setPhone}/>
  <TextInput forId={"phoneInput"} type="tel">Phone number</TextInput>
      </div>
      {/*same title-1*/}
      <div className="dev-profile__general-modal-wrapper-2">
      <p className="dev-profile__general-modal-title">Introduce yourself briefly<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <button className="dev-profile__general-modal-generator-btn">Auto generate</button>
      </div>
      <TextInput wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
        3000 
      } rows={
        3
      } forId={"textAreaGeneral"}>Summarize about yourself</TextInput>
       <p className="dev-profile__general-modal-title">Linkedin username<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
       <div className="dev-profile__general-modal-linkedin-wrapper">
        <span className="dev-profile__general-modal-linkedin-icon-wrapper">
        <img width={14}
         height={14} src={linkedin} className="dev-profile__general-modal-in-icon"/>
        </span>
        <input className="dev-profile__general-modal-linkedin-input" type="text" />
        <button className="dev-profile__general-modal-linkedin-btn">import</button>
       </div>
       <div>
       <p className="dev-profile__general-modal-linkedin-text">We're importing your Linkedin data! you can keep going when we do it!</p>
       <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
       </div>
      
      </div>
    </div>
    </div>
  </div>
  }
  {/*Experience modal */}
{ expModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Overall experience</p>
    <button type="button" onClick={()=>setExpModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile-modal-body">
        <div className="dev-profile-exp-modal-input-wrapper">
        <TextInput  type={"number"} forId={"yearOfExp"}>Years of experience</TextInput>
        <TextInput  type={"number"} forId={"yearRemoteOfExp"}>Years of remote experience (Optional)</TextInput>
        {/*Error, requier must be removed */}
        </div>
        <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
      </div>
  
    </div>
    </div>
  </div>}
  {aviaModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Overall experience</p>
    <button type="button" onClick={()=>setAviaModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile-modal-body">
     <div className="dev-profile__avia-modal-main-wrapper">
     <label className="dev-profile__avia-modal-label" htmlFor="aviaInput">
        <input checked className="dev-profile__avia-modal-input" id="aviaInput" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
    <span className="dev-profile__avia-modal-text">Available for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am looking for a remote job.</span>
    </div>
   </label>
   <label className="dev-profile__avia-modal-label" htmlFor="aviaInput2">
        <input className="dev-profile__avia-modal-input" id="aviaInput2" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
   <span className="dev-profile__avia-modal-text">Unavailable for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am not looking for a remote job.</span>
    </div>
   </label>
     </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
 
   
      </div>
    </div>
    </div>
  </div>}
  {roleModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Role and salary</p>
    <button type="button" onClick={()=>setRoleModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile-modal-body dev-profile-role-modal-body">
<DropDownMenu roleRef={roleRef} options={jobsOptions}  labelText={"Preffered role"}></DropDownMenu>
       <div className="dev-profile-role-modal-inputs-wrapper">
    <div className="dev-profile-role-modal-input-wrapper">
   <input defaultValue={currentSalary.toLocaleString()} onChange={handleCurrentSalaryChange} type="number" id="salaryInputCurrent"    className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputCurrent" className="dev-profile-role-modal-salary-label">Current monthly salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    <div  className="dev-profile-role-modal-input-wrapper">
   <input type="number" defaultValue={"$ 0"}  id="salaryInputExp"  className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputExp" className="dev-profile-role-modal-salary-label" >Expected salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
      </div>
    </div>
    </div>
  </div>}
  {skillsModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Skills and Languages</p>
    <button type="button" onClick={()=>setSkillsModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile-modal-body dev-profile-role-modal-body">
        
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
      </div>
    </div>
    </div>
  </div>
  }

  
</div>
}