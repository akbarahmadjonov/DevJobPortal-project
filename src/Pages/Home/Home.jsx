import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import { register } from 'swiper/element/bundle'
import dotsImage from "../../Assets/Images/dots.png"
import img1 from "../../Assets/Images/img1.jpg"
import img2 from "../../Assets/Images/img2.jpg"
import img3 from "../../Assets/Images/img3.jpg"
import img4 from "../../Assets/Images/img4.jpg"
import rectangle from "../../Assets/Images/Rectangle1.png"
import womanImage from "../../Assets/Images/woman.png"
import { BlueButton, FeedbackItem } from "../../Components"
import { homeActions } from "../../Redux/HomeSlice"
import { Footer } from "../../Widgets"
import Header from "../../Widgets/Header/Header"
import "./Home.scss"



export const Home =  ()=>{

  const {jobs, homeLoading, homeError} = useSelector((state)=>state.home)
  register()



  //can be removed
  // const dispatch = useDispatch()
//can be removed
  // const url = "https://jobas.onrender.com/api";

  //can be removed
// useEffect(()=>{
//   axios.get(`${url}/category`).then((data)=>{
//     dispatch(homeActions.setJobs(data.data))
//   }).catch(()=>{
//     dispatch(homeActions.setHomeError(true))
//   })
// }, [])

useEffect(()=>{
  new Swiper('.swiper', {
    direction: 'horizontal',
    spaceBetween: 103,
    slidesPerView: 3.4,
    loop: false,
    
  });
})

if (homeError) return <p className="error">Something went wrong. Try again...</p>

return (
  <div className="home">
    <div className="home__header-wrapper">
      <Header inputStyle={{ backgroundColor: "#FFFFFF" }} className />
    </div>
    <main>
      <section className="home__hero">
        <div className="top-container">
          <div className="home__hero-wrapper">
            <div className="home__hero-left">
              <h1 className="home__hero-title">
                Find your dream
                <span className="home__hero-title-span">&nbsp;job</span>
                full time, part time
              </h1>
              <p className="home__hero-text">
                The jobportal helps you land your dream job, the ones done on
                site or remote. We search for jobs for people allover the world
                and accross all time zones
              </p>
              <BlueButton to={"/jobs"}>Find me a job</BlueButton>
            </div>
            <div className="home__hero-right">
              <img width={429} height={489} src={dotsImage} alt="dots" />
              <img
                className="home__hero-img1"
                width={429}
                height={489}
                src={womanImage}
                alt="dots"
              />
            </div>
          </div>
          <div className="hero-stats">
            <ul className="hero-stats__list">
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">120K+</p>
                  <p className="hero-stats__sub-text">Career opportunities</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">1M+</p>
                  <p className="hero-stats__sub-text">Jobs seekers</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">100k+</p>
                  <p className="hero-stats__sub-text">Remote jobs</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">20K+</p>
                  <p className="hero-stats__sub-text">Hiring companies</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="home__careers">
        <div className="top-container">
          <div className="home-careers__wrapper">
            <div className="home-careers__pictures">
              <ul className="home-careers__list">
                <li className="home-careers__item">
                  <img src={img1} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img2} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img3} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img4} width={212} height={19} alt="laptop" />
                </li>
              </ul>
              <img
                width={627}
                height={634}
                className="home-careers__rectangle"
                src={rectangle}
                alt="rectangle"
              />
            </div>
            <div className="home-careers__text-wrapper">
              <h2 className="sub-title-text">All careers gigs, one portal</h2>
              <p className="home-careers__text">
                Whatever you are, a software developer, a user interface
                designer or someone else, we got you. We have all types of jobs
                ready for you.
              </p>
              <BlueButton to={"/jobs"}>Show me all available jobs</BlueButton>
            </div>
          </div>
        </div>
      </section>
      <section className="home__jobs">
        <div className="middle-container">
          <h3 className="sub-title-text home__jobs-sub-title-text">
            The choice is yours
          </h3>
          <h3 className="text home__jobs-text">Choose the job type you want</h3>
          <ul className="home__jobs-cards-list">
            {homeLoading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              jobs?.map((job) => (
                <li key={job._id} className="home__jobs-cards-item">
                  <Link to={"/jobs"}>
                    {/* <img style={{marginBottom: 20}} src={job.jobImg} alt="job image" /> */}
                    <svg
                      className="home__jobs-card-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width={38}
                      height={31}
                      viewBox="0 0 38 31"
                      fill="none"
                    >
                      <path d="M34.7576 0H2.81818C1.26818 0 0 1.26818 0 2.81818V22.5455C0 24.0955 1.26818 25.3636 2.81818 25.3636H13.1515V27.3364C13.1045 27.5242 12.7288 28.0409 12.5409 28.2758C12.0242 28.9333 11.5076 29.5909 11.8833 30.3424C12.0242 30.6712 12.4 31 13.1515 31H23.9545C24.4242 31 25.5045 31 25.8803 30.1545C26.2561 29.3091 25.5985 28.6515 25.0348 28.0409C24.847 27.8061 24.5182 27.4773 24.4242 27.2894V25.3636H34.7576C36.3076 25.3636 37.5758 24.0955 37.5758 22.5455V2.81818C37.5758 1.26818 36.3076 0 34.7576 0ZM14.2318 29.1212C14.6545 28.6045 15.0303 27.9939 15.0303 27.3364V25.3636H22.5455V27.3364C22.5455 27.9939 23.0152 28.6045 23.4848 29.1212H14.2318ZM35.697 22.5455C35.697 23.0621 35.2742 23.4848 34.7576 23.4848H2.81818C2.30152 23.4848 1.87879 23.0621 1.87879 22.5455V19.7273H35.697V22.5455ZM35.697 17.8485H1.87879V2.81818C1.87879 2.30152 2.30152 1.87879 2.81818 1.87879H34.7576C35.2742 1.87879 35.697 2.30152 35.697 2.81818V17.8485Z" />
                    </svg>
                    <h4 className="home__jobs-cards-title">{job.jobName}</h4>
                    <p className="text home__jobs-cards-text">{job.jobDesc}</p>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
      <section className="home__why-section">
        <div className="middle-container why-section__wrapper">
          <h3
            style={{ color: "#FFF" }}
            className="sub-title-text why-section__title"
          >
            Why choose us
          </h3>
          <p className="text why-section__text">Why not choose us</p>
          <ul className="why-section__list">
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">No discount on salaries</p>
              <p className="text why-section__item-text">
                On your monthly payment, we get no discount. We don’t charge you
                anything, all the money is yours.
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>

                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">We’re here to help</p>
              <p className="text why-section__item-text">
                Would you say no to somebody who want to help you land a job?
                That’s impossible.
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">We’re a large community</p>
              <p className="text why-section__item-text">
                Do you know the first thing you need in your career? The people
                you do the same thing. Find them here
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
              </div>
              <p className="why-section__item-title">We’re a large community</p>
              <p className="text why-section__item-text">
                Do you know the first thing you need in your career? The people
                you do the same thing. Find them here
              </p>
            </li>
          </ul>
          <p style={{ textAlign: "center", marginBottom: 60 }} className="text">
            Convinced ?
          </p>
          <div style={{ textAlign: "center" }}>
            <BlueButton to={"/jobs"}>Get started</BlueButton>
          </div>
        </div>
      </section>
      <section className="home__feedbacks">
        <div className="feedback-container">
          <h5 style={{ color: "#2F2F2F" }} className="sub-title-text">
            What others say about us
          </h5>
          <p className="text home-feedbacks__text">
            Not yet convinced to get started? Here are what other job seekers
            say about us.
          </p>
          <div className="swiper">
            <div className="swiper-wrapper swiper-wrapper-custom">
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
            </div>
            <div className="swiper-shadow"></div>
          </div>
        </div>
      </section>
    </main>
    <div className="middle-container">
      <Footer></Footer>
    </div>
  </div>
);
}