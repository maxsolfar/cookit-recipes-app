import React from 'react';

import bookFood from "../../../assets/loader/food-book.png";
import loading from "../../../assets/loader/loading.png";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.ContainerLoader}>
				<div className={styles.ContainerRain}>
					<div className={styles.FoodA}></div>
				</div>
        <img src={bookFood} className={styles.BookFood} alt="loading-img" />
        <img src={loading} className={styles.Loading} alt="loading-img" />
      </div>
    </>
  )
}

export default Loader;