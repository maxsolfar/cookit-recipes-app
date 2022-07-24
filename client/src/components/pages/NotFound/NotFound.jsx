import React from 'react';

import styles from "./NotFound.module.css";
import Navbar from "../../organisms/Navbar/Navbar";

import backgroundFoodA from "../../../assets/not-found/back1.png";
import backgroundFoodB from "../../../assets/not-found/back2.png";

import {useNavigate} from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  function backHome(){
    navigate("/recipes");
  }

  return (
    <>
      <Navbar/>
      <div className={styles.ContainerTitle}>
          
          <div className={styles.Topside}>
            <h2 className={styles.Title}>4</h2>
            <figure className={styles.Dish} ></figure>
            <h2 className={styles.Title}>4</h2>
          </div>
          <span className={styles.SubTitle}>This page you requested could not be found.</span>
          <button onClick={backHome} className={styles.Button}>Back to Home</button>

          <img className={styles.FoodA} src={backgroundFoodA} alt="background-food" />
          <img className={styles.FoodB} src={backgroundFoodB} alt="background-food" />
      </div>
    </>
  )
}
 
export default NotFound;