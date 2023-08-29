import React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Particles from "react-tsparticles";
import { useNavigate } from "react-router";

const animateTextBackground = keyframes`
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 100% 0;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
  }
`;

const ErrorPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const H1 = styled.h1`
  font-size: 30vh;
  font-weight: bold;
  position: relative;
  margin: -8vh 0 0;
  padding: 0;

  &:after {
    content: attr(data-h1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: transparent;
    background: repeating-linear-gradient(
      -45deg,
      #71b7e6,
      #69a6ce,
      #b98acc,
      #ee8176,
      #b98acc,
      #69a6ce,
      #9b59b6
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400%;
    text-shadow: 1px 1px 2px transparentize(#fff, 0.75);
    animation: ${animateTextBackground} 10s ease-in-out infinite;
  }
`;

const P = styled.p`
  color: #d6d6d6;
  font-size: 8vh;
  font-weight: bold;
  line-height: 10vh;
  max-width: 600px;
  position: relative;

  &:after {
    content: attr(data-p);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: transparent;
    text-shadow: 1px 1px 2px transparentize(#fff, 0.5);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
  }
`;

const BackLink = styled.a`
  position: fixed;
  right: 40px;
  bottom: 40px;
  background: repeating-linear-gradient(
    -45deg,
    #71b7e6,
    #69a6ce,
    #b98acc,
    #ee8176
  );
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  padding: 15px 30px;
  text-decoration: none;
  transition: 0.25s all ease-in-out;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
`;

const particlesConfig = {
  particles: {
    number: {
      value: 5,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#fcfcfc",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.2,
        sync: false,
      },
    },
    size: {
      value: 140,
      random: false,
      anim: {
        enable: true,
        speed: 10,
        size_min: 40,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 8,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: true,
    },
  },
  retina_detect: true,
};

function App() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <ErrorPageContainer className="error-page">
        <div className="flex flex-col bg-[#007aff]/20 items-center justify-center w-full h-[100vh]">
          <H1 data-h1="404">404</H1>
          <P data-p="PAGE NOT FOUND" className="text-white" style={{color:"white"}}>PAGE NOT FOUND</P>
        </div>
      </ErrorPageContainer>
      <ParticlesContainer>
        <Particles id="particles-js" params={particlesConfig} />
      </ParticlesContainer>
      <BackLink onClick={(e) => navigate(-1)} className="back">
        GO BACK
      </BackLink>
    </>
  );
}

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default App;
