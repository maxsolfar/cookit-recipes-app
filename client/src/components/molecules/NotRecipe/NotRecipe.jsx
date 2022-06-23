import React from 'react';

import styles from "./NotRecipe.module.css";

function NotRecipe() {
  return (
    <>
      <section>
        <img alt="no-recipe-img" />
        <button className={styles.Reload}></button>
      </section>
    </>
  )
}

export default NotRecipe;