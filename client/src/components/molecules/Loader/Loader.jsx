import React from 'react';

import loading from "../../../assets/loader/loading.png";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.ContainerLoader}>
				<div className={styles.ContainerRain}>
					<div className={styles.FoodA}></div>
				</div>
        <div className={styles.BookFood} alt="loading-img" ></div>
        <img src={loading} className={styles.Loading} alt="loading-img" />
      </div>
    </>
  )
}

export default Loader;