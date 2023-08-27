import axios from "axios"
import { Backdrop, Checkbox, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactFlagsSelect from 'react-flags-select';
import 'react-languages-select/scss/react-languages-select.scss';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";
import Select from 'react-select';
import closeIcon from "../../Assets/Icons/close-button.svg";
import editPen from "../../Assets/Icons/edit-pen.svg";
import linkedin from "../../Assets/Icons/linkedin.svg";
import pictureIcon from "../../Assets/Icons/picture.svg";
import cSharpIcon from "../../Assets/Images/c#.png";
import { DropDownMenu } from "../../Components";
import { BlueButton } from "../../Components/BlueButton/BlueButton";
import { TextInput } from "../../Components/TextInput";
import langList from "./Components/langList/langList";
import "./DevProfile.scss";
import phoneIcon from "../../Assets/Icons/phone-icon-2.svg"
import emailIcon from "../../Assets/Icons/email-icon.svg"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Redux/UserSlice";
import { homeActions } from "../../Redux/HomeSlice";
import { CustomSelect } from "./Components";




export const DevProfile = ()=>{


  const dispatch =useDispatch()
  const { token, userData, loading, error } = useSelector((state) => state.user);
  const {jobs, homeLoading, homeError} = useSelector((state)=>state.home)
  
  const [applyFile, setApplyFile] = useState(null) //upload resume // can be removed  
  const [applyImg, setApplyImg] = useState(null) //upload image //can be removed
  const [imageUrl, setImageUrl] = useState(null); //preview image // can be removed
  // const [fileName, setFileName] = useState("")
 
  //Exception, couldn't access if declare after 
  const available = userData?.available
  const [avia, setAvia] = useState(available)

  //Modals
  const [genModal, setGenModal] = useState(false)
  const [expModal, setExpModal] = useState(false)
  const [aviaModal, setAviaModal] = useState(false)
  const [roleModal, setRoleModal] = useState(false)
  const [skillsModal, setSkillsModal] = useState(false)
  const [workExpModal, setWorkExpModal] = useState(false)
  const [eduModal, setEduModal] = useState(false)
  //

  
  const [phoneCode, setPhoneCode] = useState()
  const [currentSalary, setCurrentSalary] = useState(0);

  //Detect button data-types and id

  const [btnType, setBtnType] = useState()
  const [eduId, setEduId] = useState()


  //Managing inputs adding


  
const skillsInfo = userData?.skills


const [inputs, setInputs] = useState([{ skill: '', experience: '', level: '' }]);


  // if(userData?.data){
  //   inputs = userData?.data?.skills
  // }
 


  const handleInputChange = (index, inputName, selectedOption) => {
    const newInputs = [...inputs];
    //May be let 
    newInputs[index][inputName] = selectedOption;
    setInputs(newInputs);

    // Add a new div with three inputs if the last div is filled
    if (index === inputs.length - 1 && selectedOption !== '') {
      setInputs([...inputs, { skill: '', experience: '', level: '' }]);
    }
  };




  // Input values

  // const [skill, setSkill] = useState()

  //refs
const roleRef = useRef(null); //for role and salary dropdown
  //

  //Mock datas
  const langLevelOptions = [
    {value: "Beginner", label: "Beginner"},
    {value: "Experienced", label: "Experienced"},
    {value: "Advanced", label: "Advanced"},
    {value: "Expert", label: "Expert"},
    {value: "Native", label: "Native"}
  ]


  const competencyOptions = [
    {value: "Beginner", label: "Beginner"},
    {value: "Experienced", label: "Experienced"},
    {value: "Advanced", label: "Advanced"},
    {value: "Expert", label: "Expert"},
  ]

  const jobsOptions = [
    "Beginner", "Experienced", "Advanced", "Expert",
  ]
 

  const years = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
  ]

 const yearsList =  years.map(opt => ({ label: opt, value: opt }));

 const degrees = [
  "Bachelors", "Master", "Doctorate", "MBA", "Secondary High school"
]

const degreeList =  degrees.map(opt => ({ label: opt, value: opt }));

const skills = [
  ".NET", "ABAP", "Android", "ReactJs", "ReactNative", "Flutter"
]

const skillsList =  skills.map(opt => ({ label: opt, value: opt }));






  //

  //Select--------------



  

  //

  //Variables------------

  //resume file name
  const fileName = userData?.resume?.filePath
  const filePath = `https://job-px4t.onrender.com/resumes/${fileName}`



  //User data from server

  const userName = userData?.fullName
  const userEmail = userData?.email
  const profilePicture = `https://job-px4t.onrender.com${userData?.data?.profilePicture}`


  
  const nationalityInfo = userData?.nationality
  const residanceInfo = userData?.residence


  const phoneNumber = userData?.phoneNumber
  const aboutyourself = userData?.aboutyourself
  const linkedIn = userData?.linkedIn
  const experience = userData?.experience?.experience
  const remoteExperience = userData?.experience?.remoteExperience
  const preferredRole = userData?.roleAndSalary?.preferredRole
  const monthlySalary = userData?.roleAndSalary?.monthlySalary
  const expectedSalary = userData?.roleAndSalary?.expectedSalary

  const educationsList = userData?.education




  //


  
  const [nationality, setNationality] = useState("");

  const [residance, setResidance] = useState("");


  //
 
 
  
  //
  //Logics--------------------------

  //This code for getting values for input from server in education modal, while editing



  const selectedEdu = educationsList?.find(item => item?._id === eduId)

console.log(selectedEdu);

const eduStartDateString = selectedEdu?.startDate
console.log(eduStartDateString);
const [month, year] = (eduStartDateString ?? "").split("/");
const eduModalStartDate = new Date(`${year}-${month}-01`);

console.log(eduModalStartDate);


//State for date formats

const [startDateWorkExp, setStartDateWorkExp] = useState(); //DatePicker start date Work Expirience
const [endDateWorkExp, setEndDateWorkExp] = useState(); //DatePicker end date  Work Expirience

const [startDateEdu, setStartDateEdu] = useState(eduModalStartDate); //DatePicker start date education
const [endDateEdu, setEndDateEdu] = useState(); //DatePicker end date  education






   const url = "https://job-px4t.onrender.com/api"

  //Draft token

  //
  //Handles and integration
//First form upload resume


useEffect(()=>{
  dispatch(userActions.setLoading(true))
  axios.get(`${url}/user/token`, {
    headers: {
    token
    }
  }).then((data)=>{
   
    dispatch(userActions.setUserData(data.data))
    setNationality(data.data?.nationality)
    setResidance(data.data?.residence)
    setPhoneCode(data.data?.phoneNumber.split(" ")[0])
    setInputs(data.data?.skills)
    
  }).catch(()=>{
  }).finally(()=>{
    dispatch(userActions.setLoading(false))
  })
}, [])
;


const handleResumeUpload = (evt)=> {
  //can be removed then
  // if (evt.target.files) {
  //   // setApplyFile(evt.target.files[0]);
  //   // setFileName(evt.target.files[0]?.name || "") 
  // }

  const formData = new FormData()

  formData.append("resume", evt.target.files[0])


  axios.post(`${url}/resume`, formData, {
    headers: {
      token
    }
  }).then((res)=>{ 
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
  })

}

const handleResumeEdit = (evt)=>{

  const formData = new FormData()

  formData.append("resume", evt.target.files[0])


  axios.put(`${url}/resume/${userData?.resume?._id}`, formData, {
    headers: {
      token
    }
  }).then((res)=>{ 
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
  })
}

const handleResumeDelete = ()=>{
  axios.delete(`${url}/resume/${userData?.resume?._id}`, {
    headers: {
    token
    }
  }).then((res)=>{
console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
  })
}






//General info modal 2nd form control:
  const handleGenModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

const profileImg = document.getElementById('selectedFileImg').files[0]

const target = evt.target

//Can be destructed:
const fullName = `${target.firstNameInput.value} ${target.lastNameInput.value}`
const phoneNumber = target.phoneInput.value
const aboutyourself = target.textAreaGeneral.value
const linkedIn = target.linkedInLink.value


const formData = new FormData()

formData.append("fullName", fullName)
formData.append("profilePicture", profileImg)
formData.append("aboutyourself", aboutyourself)
formData.append("nationality", nationality)
formData.append("residence", residance)
formData.append("phoneNumber", `${phoneCode} ${phoneNumber}`)
formData.append("linkedIn", linkedIn)




axios.put(`${url}/user`, formData, {
  headers: {
    token
  }
} ).then((res)=>{
  console.log(res);
  setGenModal(false)
}).catch((err)=>{
  console.log(err.message);
}).finally(()=>{
  dispatch(userActions.setLoading(false))
})



  }

  //Overall experience 3rd modal form control

  const handleExpModalSubmit = (evt)=>{
    evt.preventDefault()
    
    dispatch(userActions.setLoading(true))

    const target = evt.target

    const experience = +target.yearOfExp.value
    const remoteExperience = +target.yearRemoteOfExp.value

    const body = {
      experience, remoteExperience
    }

    const type = {"Content-type": "application/json"}

    axios.put(`${url}/experience`, body, {
      headers: {
        token, type
      }
    }).then((res)=>{
      console.log(res);
      setExpModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(userActions.setLoading(false))
    })
  }

  ////Overall aviablity 4th modal form control

  const handleAviaInputChange = (evt)=>{
    setAvia(evt.target.value)
  }

  const handleAviaModalSubmit = (evt)=>{
    evt.preventDefault()
    dispatch(userActions.setLoading(true))

const formData = new FormData()

formData.append("available", avia )

    axios.put(`${url}/user`, formData, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setAviaModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(userActions.setLoading(false))
    })
  }

  //Fifth modal role modal submit

  const handleRoleModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    const target = evt.target

    const preferredRole = target.roleModalDropdown.value
    const monthlySalary = target.salaryInputCurrent.value
    const expectedSalary = target.salaryInputExp.value

    const body = {
      preferredRole, monthlySalary, expectedSalary 
    }
   

    axios.put(`${url}/roleAndSalary`, body, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setRoleModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(userActions.setLoading(false))
    })

  }

  //Skill and Languages 6th modal select handles

  const handleSkillSelect = (opt)=> {
    console.log(opt.value);
    // setSkill(opt.value)
  }

  const handleSkillYearSelect = ()=>{
return null
  }

  const handleSkillCompetencySelect = ()=> {
return null
  }

  const handleSkillsModalSubmit = (evt)=>  {
    evt.preventDefault()

  }
  

  //7th modal Work experience form

  const handleWorkExpModalSubmit = (evt)=> {
    evt.preventDefault()
    const target = evt.target

  
  }

  //8th Last modal Education form

  const [degree, setDegree] = useState(selectedEdu?.degree)

  const handleEduModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))



    

    const target = evt.target

    const name = target.schoolInput.value
    const fieldOfStudy = target.fieldOfStudy.value
    let startDate = target.eduStartDate.value
    let endDate = target.eduEndDate.value


      const body ={
      name, degree, fieldOfStudy,startDate, endDate
    }


    axios.post(`${url}/education`, body, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setEduModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(userActions.setLoading(false))
    })


  }


//Can be removed then
  // const handleFileUpload =  (evt) => {
  //   if (evt.target.files) {
  //     setApplyFile(evt.target.files[0]);
  //     setFileName(evt.target.files[0]?.name || "") 
  //   }
  // };

  //Can be removed then
  // const handleImgUpload =  (evt) => {
  //   if (evt.target.files) {
  //     setApplyImg(evt.target.files[0]);
  //   } 

  // };

  // can be removed then
  // useEffect(() => {
  //   if (applyImg) {
  //     setImageUrl(URL.createObjectURL(applyImg));
  //   } 
  //   else {
  //     setImageUrl(null)
  //   }

  // }, [applyImg]);

 


return  <div className="dev-profile">
  
<Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  
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
                    <p className="profile-name">{userName}</p>
                    <p className="profile-email">{userEmail}</p>
                    </div>
                  </div>
                </div>
  </header>
  <main className="dev-profile__main">
    <section className="dev-profile__info-section-container dev-profile__info-section">
    <p className="dev-profile__dev-name">{`Wellcome, ${userName}`}</p>
    <div className="dev-profile__info-wrapper">
      <p className="dev-profile__title">Your Career Profile</p>
      <p className="dev-profile__text">Your Supercoder profile saves your info so you can to jobs quickly, receive personalized jobs recomendations.</p>
    </div>
    <div className="dev-profile__info-wrapper-2">
    <p className="dev-profile__title dev-profile-control-left-width">Resume</p>
  {fileName ? <a className="dev-profile__text-2 dev-profile-control-middle-width" href={filePath} target="_blank" download="resume-file">{fileName}</a>  : <p className="dev-profile__text-2">"To start your application, upload your resume in English in DOCX or PDF with a max size of 2 MB"</p>}
   <input onChange={!fileName ? handleResumeUpload : handleResumeEdit} accept=".pdf, .docx" type="file" id="selectedFile" style={{display: "none"}} />
   <div className="dev-profile__resume-btn-wrapper">
   {fileName && <button onClick={handleResumeDelete} className="dev-profile__delete-btn">Delete resume</button>}
<input className={!fileName ? "dev-profile__upload" :  "dev-profile__edit-btn"} type="button" value={!fileName ? "Upload resume" : "Edit"} 
onClick={()=>{
  document.getElementById('selectedFile').click()
}} />
   </div>
  
    </div>
    {/* General information - can be component*/}
    <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-general">
      <div className="dev-profile__gen-info-top-wrapper">
      {!profilePicture & !userName & !nationalityInfo ? <p className="dev-profile__title">General information<span className="dev-profile__required">*</span></p> : <div className="dev-profile__account-wrapper dev-profile__general-account-wrapper dev-profile-control-left-width">
      <img className="dev-profile_general-picture" style={profilePicture && {borderRadius: "50%"}}  width={50} height={50} src={profilePicture ? profilePicture : pictureIcon} alt="preview image" /> 
     
{/* <div className="dev-profile__account-image">B</div> */}
<div className="dev-profile__account-inner-wrapper">
<p className="dev-profile__account-name">{userName}</p>
<p className="dev-profile__account-nation">{nationalityInfo}</p>
</div>
</div>}
<div className="dev-profile__gen-info-middle-wrapper dev-profile-control-middle-width">
 <div className="dev-profile__gen-info-middle-inner-wrapper">
  <img width={14} height={14} src={emailIcon} alt="email-icon" /><p>{userEmail}</p>
  </div>
 <div className="dev-profile__gen-info-middle-inner-wrapper">
  {phoneNumber && <><img width={14} height={14} src={phoneIcon} alt="phone-icon" /><p>{phoneNumber}</p></>}
  </div>
</div>
      <button className={phoneNumber && "dev-profile__edit-btn"} onClick={()=>setGenModal(true)} type="button">{!phoneNumber && <img width={18} height={18} src={editPen} alt="edit pen" />}{phoneNumber && "Edit"}</button>
      </div>
    {aboutyourself &&  <div className="dev-profile__gen-info-bottom-wrapper">{aboutyourself}</div>}
    </div>
    {/* Overall experience - can be component */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Overall experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    <p className="dev-profile-control-middle-width">{experience && `${experience} year(s)`}  {remoteExperience ? `/${remoteExperience} year(s)` : ""}</p>
  <button className={experience && "dev-profile__edit-btn"} onClick={()=>setExpModal(true)} type="button">{!experience && <img width={18} height={18} src={editPen} alt="edit pen" />}{experience && "Edit"}</button>
    </div>
    {/*Avaibility*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Avaibility<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    <p className="dev-profile-control-middle-width">{available ? "Available" : "Not Available"}</p>
  <button className={available && "dev-profile__edit-btn"} onClick={()=>setAviaModal(true)} type="button">{!available && <img width={18} height={18} src={editPen} alt="edit pen" />}{available && "Edit"}</button>
    </div>
    {/*Role and salary*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Role and Salary<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    {preferredRole && <div className="dev-profile-control-middle-width">
    <strong>{preferredRole}</strong>
    <p>Current salary: ${monthlySalary}</p>
   {expectedSalary && <p>Expected salary: ${expectedSalary}</p>}
    </div>}
  <button className={preferredRole && "dev-profile__edit-btn"} onClick={()=>setRoleModal(true)} type="button">{!preferredRole && <img width={18} height={18} src={editPen} alt="edit pen" />}{preferredRole && "Edit"}</button>
    </div>
    {/*Skills and Languages */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Skills and languages<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setSkillsModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>
    {/*Work experience */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Work experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button onClick={()=>setWorkExpModal(true)} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>
    </div>  
       {/*Education */}
       <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-3a">
        <div className="dev-profile__education-top-wrapper">
        <p className="dev-profile__title dev-profile-control-left-width">Education<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
   
   {!educationsList ? <button onClick={()=>{setEduModal(true)
    setBtnType("add") 
  }} data-type="edu-add"  type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button> : <button data-type="edu-add"
   onClick={()=>{setEduModal(true)
    setBtnType("add") 
   }} className="dev-profile__edit-btn dev-profile__edit-btn-2">&#43;&nbsp;Add Education</button>}
        </div>
        <ul className="dev-profile__education-list">
    {educationsList?.map((item, index)=>(
      <li key={index} className="dev-profile__education-middle-wrapper"> 
      <div>
      <strong>{item.name}</strong>
      <p>{item.fieldOfStudy}&nbsp;/&nbsp;{item.degree}</p>
      <p>{item.startDate.split("T")[0]}&nbsp;-&nbsp;{item.endDate.split("T")[0]}</p>
      </div>
    <button onClick={()=>{
      setEduId(item._id)
      setBtnType("edit") 
      setEduModal(true)}} data-id={item._id} data-type="edu-edit" className="dev-profile__edit-btn">Edit Education</button>
    </li>
    ))}

    </ul>

    
  
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
  {/*General information modal */}
  {genModal &&
  <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">General information</p>
    <button type="button" onClick={()=>setGenModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
         {/*same title-1*/}
         <form onSubmit={handleGenModalSubmit}>
         <p className="dev-profile__general-modal-title">Profile picture<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <div className="dev-profile_general-modal-picture-wrapper"><img className="dev-profile_general-picture" style={profilePicture && {borderRadius: "50%"}}  width={50} height={50} src={profilePicture ? profilePicture : pictureIcon} alt="preview image" /> 
      <input 
      // onChange={handleImgUpload} 
      accept="image/jpg, image/jpeg, image/png" type="file" id="selectedFileImg" style={{display: "none"}} />
<input style={{color: "#0050c8", border: "1px solid #0050c8", backgroundColor: "transparent", padding: "3px 10px"}} className="dev-profile__upload" type="button"  value="Upload profile photo" onClick={()=>{
  document.getElementById('selectedFileImg').click()
}} />
<button onClick={()=>{
  // setImageUrl(null)
  // setApplyImg(null)
  //can be removed
}
  } className="dev-profile__general-modal-delete-button">Delete profile photo</button>
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
      <TextInput defaultValue={userName?.split(" ")[0] || ""} required forId={"firstNameInput"}>First name</TextInput>
      <TextInput defaultValue={userName?.split(" ")[1] || ""} required forId={"lastNameInput"}>Last name</TextInput>
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
        <div className="select-flags-wrapper">
        <span className="select-flags-label">Nationality&nbsp;<span style={{color: "blue"}}>*</span></span>
      <ReactFlagsSelect 
      selected={nationality}
      onSelect={(country)=>setNationality(country)}
      placeholder=""
      searchable
      className="menu-flags"
      showOptionLabel
      />
        </div>
<div className="select-flags-wrapper">
<span className="select-flags-label">Residance&nbsp;<span style={{color: "blue"}}>*</span></span>
<ReactFlagsSelect  selected={residance}
      onSelect={(country) => setResidance(country)
        }
      placeholder=""
      searchable
      className="menu-flags"
      />
</div>
      
      </div>
      <div className="dev-profile__general-modal-input-wrapper dev-profile__general-modal-input-wrapper-2">
      <PhoneInput
  className="phone-input"
  international
  
  // defaultCountry="KR"
  value={phoneNumber?.split(" ")[0]}
  onChange={setPhoneCode}/>
  <TextInput defaultValue={phoneNumber?.split(" ")[1]} required forId={"phoneInput"} type="tel">Phone number</TextInput>
      </div>
      {/*same title-1*/}
      <div className="dev-profile__general-modal-wrapper-2">
      <p className="dev-profile__general-modal-title">Introduce yourself briefly<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <button className="dev-profile__general-modal-generator-btn">Auto generate</button>
      </div>
      <TextInput defaultValue={aboutyourself} wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
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
        <input
        defaultValue={linkedIn}
        id="linkedInLink" 
        className="dev-profile__general-modal-linkedin-input" type="text" />
        <button className="dev-profile__general-modal-linkedin-btn">import</button>
       </div>
       <div>
       <p className="dev-profile__general-modal-linkedin-text">We're importing your Linkedin data! you can keep going when we do it!</p>
       <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
       </div>
      
         </form>

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
      <div className="dev-profile__modal-body">
        <form onSubmit={handleExpModalSubmit}>
        <div className="dev-profile-exp-modal-input-wrapper">
        <TextInput defaultValue={experience} min={0} max={50} required type={"number"} forId={"yearOfExp"}>Years of experience</TextInput>
        <TextInput defaultValue={remoteExperience} min={0} max={50}  type={"number"} forId={"yearRemoteOfExp"}>Years of remote experience (Optional)</TextInput>
        {/*Error, requier must be removed */}
        </div>
        <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading}  style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
       </form>
      </div>
  
    </div>
    </div>
  </div>}
  {aviaModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Aviability</p>
    <button type="button" onClick={()=>setAviaModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleAviaModalSubmit}>
           <div className="dev-profile__avia-modal-main-wrapper">
     <label className="dev-profile__avia-modal-label" htmlFor="aviaInput">
        <input onChange={handleAviaInputChange}  value={true}  defaultChecked={available===true} className="dev-profile__avia-modal-input" id="aviaInput" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
    <span className="dev-profile__avia-modal-text">Available for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am looking for a remote job.</span>
    </div>
   </label>
   <label className="dev-profile__avia-modal-label" htmlFor="aviaInput2">
        <input defaultChecked={available===false} onChange={handleAviaInputChange} value={false} className="dev-profile__avia-modal-input" id="aviaInput2" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
   <span className="dev-profile__avia-modal-text">Unavailable for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am not looking for a remote job.</span>
    </div>
   </label>
     </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>

        </form>
    
 
   
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
      <div className="dev-profile__modal-body dev-profile-role-modal-body">
        <form onSubmit={handleRoleModalSubmit}>
        <DropDownMenu defaultValue={preferredRole} forId={"roleModalDropdown"} menuRef={roleRef} options={jobs}  labelText={"Preffered role"}></DropDownMenu>
       <div className="dev-profile-role-modal-inputs-wrapper">
    <div className="dev-profile-role-modal-input-wrapper">
   <input defaultValue={monthlySalary} type="number" id="salaryInputCurrent"    className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputCurrent" className="dev-profile-role-modal-salary-label">Current monthly salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    <div  className="dev-profile-role-modal-input-wrapper">
   <input type="number" defaultValue={expectedSalary}  id="salaryInputExp"  className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputExp" className="dev-profile-role-modal-salary-label" >Expected salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>

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
      <div className="dev-profile__modal-body">
        <form onSubmit={handleSkillsModalSubmit}>
   {/* <CustomSelect></CustomSelect> */}
   {inputs?.map((input, index)=>(
  <div key={index} className="dev-profile__modal-inputs-wrapper dev-profile__skills-modal-wrapper-1">
  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Skill&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}}
  classNamePrefix="mySelect" 
  options={skillsList}
  placeholder="Skill name"
  className="select" 
  menuPlacement="auto"
  // onChange={handleSkillSelect}
  value={input.skill}
  onChange={(selectedOption) => handleInputChange(index, 'skill', selectedOption)}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  </div>
  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Years of experience&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
    menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999}) }}
  classNamePrefix="mySelect" 
  options={yearsList}
  placeholder="Years of experience"
  className="select" 
  menuPlacement="auto"
  value={input.experience}
  onChange={(selectedOption) => handleInputChange(index, 'experience', selectedOption)}
  // onChange={handleSkillYearSelect}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  </div>

  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Years of experience&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
    menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
  classNamePrefix="mySelect" 
  options={competencyOptions}
  placeholder="Enter competency"
  className="select" 
  menuPlacement="auto"
  value={input.level}
  onChange={(selectedOption) => handleInputChange(index, 'level', selectedOption)}
  // onChange={handleSkillCompetencySelect}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  </div>
  <span 
  className="dev-profile-skills-modal-delete">&#10005;</span>
  </div>
  ))
  }
        <div className="dev-profile__modal-inputs-wrapper">
     <div className="dev-profile__skills-modal-lang-wrapper">
<p className="dev-profile__skills-modal-label">Language (Optional)</p>
<Select 
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
classNamePrefix="mySelect" 
 menuPlacement="auto"  className="select"  placeholder="Enter language" options={langList}  isSearchable={true}  />
     </div>
<Select 
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
classNamePrefix="mySelect"  menuPlacement="auto" placeholder="Proficiency"  className="select"  options={langLevelOptions}/>
        </div>
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>
      
      </div>
    </div>
    </div>
  </div>
  }
   {workExpModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Work Experience</p>
    <button type="button" onClick={()=>setWorkExpModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleWorkExpModalSubmit}>
       <div className="dev-profile__modal-inputs-wrapper">
       <TextInput forId={"CompanyName"}>Company name</TextInput>
      <TextInput forId={"JobTitle"}>Job title</TextInput>
       </div>
       <div className="dev-profile__modal-inputs-wrapper">
        <div className="dev-profile__modal-date-wrapper">
       <p className="dev-profile__skills-modal-label">Start date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
       <DatePicker
       wrapperClassName="dev-profile__modal-date-picker-wrapper"
       className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={startDateWorkExp} onChange={(date) =>{ setStartDateWorkExp(date)
  }
  } 
  
/>
        </div>
        <div className="dev-profile__modal-date-wrapper">
        <p className="dev-profile__skills-modal-label">End date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
<DatePicker

wrapperClassName="dev-profile__modal-date-picker-wrapper"
className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={endDateWorkExp} onChange={(date) => setEndDateWorkExp(date)} 
/>
        </div>

       </div>
       <div className="dev-profile__work-exp-modal-checkbox-wrapper">
       <Checkbox  /> <p className="dev-profile__work-exp-modal-checkbox-text">I am currently working in this role</p>
       </div>
       <div className="select-flags-wrapper dev-profile__work-exp-modal-flags-wrapper">
<p className="select-flags-label">Loaction (Optional)</p>
<ReactFlagsSelect  selected={residance}
      onSelect={(code) => setResidance(code)
      }
      placeholder=""
      searchable
      className="menu-flags"
      menuPlacement="auto"
      />
</div>
<div className="dev-profile__auto-gen-btn-wrapper">
<button className="dev-profile__general-modal-generator-btn">Auto generate</button>
</div>
<div>

</div>
<div className="dev-profile__work-exp-modal-textarea-wrapper">
<TextInput wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
        3000 
      } rows={
        3
      } forId={"textAreaWorkExp"}>Description</TextInput>
</div>
<Select
isMulti
 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
 classNamePrefix="mySelect"  
menuPlacement="auto" options={skillsList} className="select dev-profile__work-exp-modal-react-select" placeholder="Skill (optional)"/>
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>

        </form>
      </div>
    </div>
    </div>
  </div>
  }
     {eduModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">{btnType==="add" ? "Add Education" : "Edit Education"}</p>
    <button type="button" onClick={()=>setEduModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleEduModalSubmit}>
      <TextInput defaultValue={btnType==="edit" ?  selectedEdu.name : ""} forId={"schoolInput"}>School</TextInput>
      <div className="dev-profile__modal-inputs-wrapper dev-profile__edu-modal-select-wrapper">
        <div className="dev-profile__skills-modal-lang-wrapper">
        <p className="dev-profile__skills-modal-label">Degree&nbsp;
        <span style={{color: "blue"}}>*</span></p>
      <Select   menuPortalTarget={document.body} 
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999}) }}
        classNamePrefix="mySelect-dev-profile-edu" 
        defaultInputValue={btnType==="edit" ?  selectedEdu.degree : ""}
        options={degreeList}
        placeholder="Degree"
        className="select" 
        menuPlacement="auto"
         onChange={opt => setDegree(opt.value)}/>
        </div>
     
         <div className="dev-profile__skills-modal-lang-wrapper">
        <TextInput defaultValue={btnType==="edit" ?  selectedEdu.fieldOfStudy : ""} forId={"fieldOfStudy"}>Field of study</TextInput>
         </div>
      </div>
      <div className="dev-profile__modal-inputs-wrapper">
        <div className="dev-profile__modal-date-wrapper">
       <p className="dev-profile__skills-modal-label">Start date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
       <DatePicker

       wrapperClassName="dev-profile__modal-date-picker-wrapper"
       className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  id="eduStartDate"

  selected={startDateEdu} onChange={(date) => setStartDateEdu(date)} 
  
/>
        </div>
        <div className="dev-profile__modal-date-wrapper">
        <p className="dev-profile__skills-modal-label">End date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
<DatePicker
wrapperClassName="dev-profile__modal-date-picker-wrapper"
className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  // showMonthYearDropdown
  id="eduEndDate"
   onChange={(date) => setEndDateEdu(date)} 
/>
        </div>

       </div>
       <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>

        </form>
      </div>
    </div>
    </div>
  </div>
  }
</div>
}



