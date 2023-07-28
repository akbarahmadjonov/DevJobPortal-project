import "./FeedbackItem.scss"
import profileIcon from "../../Assets/Icons/profile.svg"


export const  FeedbackItem = ()=>{
  return <li className="feedback-item">
<img src={profileIcon} alt="profile image" />
<p className="feedback-item__title">John Doe Marquina</p>
<p className="feedback-item__job">Software advocate</p>
<p style={{color: "#999"}} className="text feedback-item__text">It was great to seek for a job with TheJobportal.
Everything was really great. They were the ones who helped me to get my current job as a software advocate at my company I don’t want to mention.</p>
  </li>
}