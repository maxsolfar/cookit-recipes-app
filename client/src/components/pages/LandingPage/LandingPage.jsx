import React from 'react';

import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css";

import logo from "../../../assets/header/logo.svg";
import BackRight from "../../../assets/landing/curve-img.png";
import Slider from '../../organisms/Slider/Slider';

function LandingPage() {
  return (
    <>
      <section className={styles.MainContainer}>

        <section className={styles.LandingContainer}>
          <div className={styles.LeftContainer}>
            <img className={styles.Logo} src={logo} alt="circle-animation" />
            <caption className={styles.Pizza}alt="pizza-animation"></caption>
            <h2 className={styles.Title}>Welcome to Cookit</h2>
            <span className={styles.Subtitle}>Here you will find the best recipes of dishes from around the world.</span>
            <Link to="/recipes" className={styles.ButtonEnter}>Let´s Cook</Link>
          </div>
          <div className={styles.RightContainer}>
            <Slider/>
            <img className={styles.RightBackground} src={BackRight} alt="dish-a-animation" />
          </div>
          
                   
        </section>

      </section>
    </>
  )
}

export default LandingPage;