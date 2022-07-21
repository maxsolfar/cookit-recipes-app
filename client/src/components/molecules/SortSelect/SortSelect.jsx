import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sortNAME, sortSCORE, filterOrigin, refreshData, getPage, filterByDiet} from "../../../redux/actions";

import styles from "./SortSelect.module.css";
import refreshIcon from "../../../assets/loader/refresh.png";

function SortSelect({paginate}) {

  const dispatch = useDispatch();
  const {currentDiet} = useSelector((state) => state);

  const initialSelects = {
    sortName: "",
    dataFrom: "",
  }
  const [filterSelects, setFilterSelects] = useState(initialSelects); 
  const [newSearch, setNewSearch] = useState(false); 

  function handleChange(e){
    e.preventDefault();
    
    filterSelects[e.target.name] = e.target.value;
    e.target.value === "A-Z" && dispatch(sortNAME("A-Z"));
    e.target.value === "Z-A" && dispatch(sortNAME("Z-A"));
    e.target.value === "highest" && dispatch(sortSCORE("HIGH_TO_LOW"));
    e.target.value === "lowest" && dispatch(sortSCORE("LOW_TO_HIGH"));
    e.target.value === "DB" && dispatch(filterOrigin("DB"));
    e.target.value === "API" && dispatch(filterOrigin("API"));
    e.target.value === "ALL" && dispatch(refreshData());

    if(currentDiet !== ""){
      dispatch(filterByDiet(currentDiet));
    }
    paginate(1);
    dispatch(getPage(1));
  }

  function refreshRecipes(e){
    e.preventDefault();
    setFilterSelects(initialSelects)
    dispatch(refreshData());
    dispatch(getPage(1));
    paginate(1);
  }

  return (
    <>
      <section className={styles.SelectContainer}>

        <img onClick={(e)=> refreshRecipes(e)} className={styles.IconRefresh} src={refreshIcon} alt="" />
        <select className={styles.Select} value={filterSelects.sortName} onChange={handleChange} name="sortName">
              <option value="" disabled selected hidden>Sort Name | Score:</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="highest">High - Low</option>
              <option value="lowest">Low - High</option>
        </select>  
        <select className={styles.Select} value={filterSelects.dataFrom} onChange={handleChange} name="dataFrom">
              <option value="" disabled selected hidden>Data from:</option>
              <option value="ALL">All Recipes</option>
              <option value="API">Recipes from API</option>
              <option value="DB">Recipes from DB</option>
        </select>
      </section>
    </>
  )
}

export default SortSelect;