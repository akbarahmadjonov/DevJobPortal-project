import { DevHeader } from "../../Components/DevHeader"
import companyLogo from "../../../../Assets/Images/ruby.png"
import "./Applied.scss"
import "../../DevProfile.scss"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Backdrop, CircularProgress } from "@mui/material"
import errorIcon from "../../../../Assets/Icons/error.svg";


export const Applied = ()=>{


  const url = "https://job-px4t.onrender.com/api"
  const token = localStorage.getItem("token")
  const [appliedJobs, setAppliedJobs] = useState(null)
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(false)

useEffect(()=>{
  setLoading(true)
  axios.get(`${url}/job/applied`, {
    headers:{
      token: token
    }
  }).then((res)=>{
    console.log(res);
    setAppliedJobs(res.data)
  }).then((data)=>{
    console.log(data);
  }).catch((err)=>{
    setError(true)
    console.log(err);
  }).finally(()=>{
    setLoading(false)
  })
}, [])



if(error) return <p className="error"> <img src={errorIcon} alt="error" /> Something went wrong. Try again...</p>;

   return  <div>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    <DevHeader style={{marginBottom: 30}}/>
    <main>
      <div className="dev-container">
      <section>
        <ul className="dev-profile-applied__list">
         {appliedJobs?.map((item)=>(
          <li className="dev-profile__info-wrapper-2 dev-profile-applied__wrapper">
            <div className="dev-profile-applied__logo-wrapper">
            <img width={30} height={30} src={item.comImg}  alt="company logo" />
            <p style={{color: "#0050c8", fontWeight: "bolder"}} className="dev-profile-applied__com-name">{item.comName}</p>
            </div>
            <p style={{fontWeight: "bolder", marginBottom: 15}}>{item.jobTitle}</p>
            <p style={{marginBottom: 10}}>Location: {item.comLocation}</p>

            {/* Note, that max-width given to the 
            p tag here. Part of the long texts may be hidden */}
            <p className="dev-profile-applied_desc" style={{marginBottom: 10}}>Description: {item.jobInfo}</p>
            <p>Salary: {item.jobPrice}</p>
            <p>Type: {item.jobType}</p>
            {/* <p>{item.jobCooperate}</p> */}
          </li>
         )) }
        </ul>
      </section>
      </div>
    </main>
    </div>

  
}