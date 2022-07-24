import React from "react";

import styles from "./Header.module.css";

import SearchBar from "../../molecules/SearchBar/SearchBar";
import DietsBar from "../../molecules/DietsBar/DietsBar";
import Navbar from "../Navbar/Navbar";

import paint from "../../../assets/header/paint.png";

function Header({paginate}) {
  return(
    <>
      <Navbar />
      <section className={styles.Header}>
        <img className={styles.Paint} src={paint} alt="img-background-header" />
        <div className={styles.LeftSide}>
          <h1 className={styles.Title}>What to cook today?</h1>
          <h2 className={styles.Subtitle}>Search Recipe by pasting the name of the ingridient.</h2>
          <SearchBar paginate={paginate}/>
          <div className={styles.DietContainer}>
            <h4 className={styles.TypesTitle}>Diet Types:</h4>
            <DietsBar paginate={paginate}/>
          </div>
        </div>
        <div className={styles.RightSide}>
          <figure className={styles.Dish} ></figure>
        </div>
      </section>
    </>
  ) 
}

export default Header;
