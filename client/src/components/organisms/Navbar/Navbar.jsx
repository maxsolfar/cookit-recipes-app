import React from 'react';

import styles from "./Navbar.module.css";

import logo from "../../../assets/header/logo.svg";

function Navbar() {
  return (
    <>
      <nav className={styles.Navbar}>
        <img className={styles.Logo} src={logo} alt="logo-img" />
      </nav>
    </>
  )
}

export default Navbar;