import React, { useEffect, useRef, useState } from "react";

import styles from "./SearchBar.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getRecipesByName, getPage, setErrors, refreshErrors, activeDiet} from "../../../redux/actions";

import chefHat from "../../../assets/searchbar/chef-hat.svg";
import ErrorImg from "../../../assets/searchbar/icon-error.png";

function SearchBar({paginate}) {

  const [search, setSearch] = useState("");
  const {errors} = useSelector((state)=> state);
  const inputRef = useRef();

  const dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function onKeyUp(e, type) {
    if(e.charCode === 13 || type === "search") {
      console.log(type);
      if(e.target.value === ""){
        dispatch(setErrors("EMPTY_SEARCH"));
        setTimeout(()=>{
          dispatch(refreshErrors());
        },1800)
      }
      else{
        dispatch(getRecipesByName(search));
        setSearch("");
        setTimeout(()=>{
        paginate(1);
        dispatch(getPage(1));
        dispatch(activeDiet());
        }
        ,1500)  
      }
    }
    
  }


  useEffect(()=>{
    if(window.innerWidth > 800){
      inputRef.current.focus();
    }  
  });
  

  return (
    <>

      <div className={errors === "EMPTY_SEARCH" ? styles.ErrorContainer : styles.NoError}>
        <span className={errors === "EMPTY_SEARCH" ? styles.Error : styles.NoError}><img src={ErrorImg} alt="img-error"/>Input Search is Empty</span>
      </div>

      <section className={styles.ContainerSearchBar}>
        <img className={styles.ChefImg} src={chefHat} alt="chef-hat-img"/>
        <input
          className={styles.InputSearch}
          type="text"
          ref={inputRef}
          placeholder={"Type something to search..."}
          value={search}
          onKeyPress={onKeyUp}
          onChange={(e) => handleChange(e)}
        />
       
        <i className={styles.IconSearch} onClick={(e)=>onKeyUp(e,"search")}></i>
      </section>
    </>
  )
}

export default SearchBar;