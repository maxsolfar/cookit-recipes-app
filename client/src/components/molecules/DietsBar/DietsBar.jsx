import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DietsBar.module.css";

import arrowLeft from "../../../assets/diets/left-icon-white.png";
import arrowRight from "../../../assets/diets/right-icon-white.png";

import { filterByDiet, getPage, activeDiet } from "../../../redux/actions";

function DietsBar({paginate}) {

  const dispatch = useDispatch();
  const {currentDiet} = useSelector((state)=> state);

  const recipes = [
    { icon: "iconGluten", title: "Gluten Free", value: "Gluten Free" },
    { icon: "iconDairy", title: "Dairy Free", value: "Dairy Free" },
    { icon: "iconKetogenic", title: "Ketogenic", value: "Ketogenic" },
    { icon: "iconVegan", title: "Vegan", value: "Vegan" },
    { icon: "iconLactoVegatarian", title: "Lacto Ovo Veg", value: "Lacto Ovo Vegetarian" },
    { icon: "iconPescetarian", title: "Pescatarian", value: "Pescatarian" },
    { icon: "iconPaleo", title: "Paleo", value: "Paleolithic" },
    { icon: "iconPrimal", title: "Primal", value: "Primal"},
    { icon: "iconLowFodMap", title: "Low FODMAP", value: "Fodmap Friendly" },
    { icon: "iconWhole30", title: "Whole 30", value: "Whole 30" },
  ]

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    if(slider.scrollLeft !== 0){
      slider.scrollLeft = slider.scrollLeft - 130;
    }
  }

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 130;
  }
  function handleSubmit(diet){
    if(currentDiet === diet){
      dispatch(activeDiet());
    }
    else{
      paginate(1);
      dispatch(getPage(1));
      dispatch(filterByDiet(diet));
      dispatch(activeDiet(diet));
    }
   
  }

  return (
    <>
      <section className={styles.MainContainer}>
  
      <button onClick={slideLeft} className={styles.LeftButton}><img src={arrowLeft} alt="icon-left" /></button>
      <div id="slider" className={styles.DietsContainer}>
        {recipes && recipes?.map((recipe, index) =>
          (
            <article key={index} className={currentDiet === recipe.value ? styles.DietActive : styles.Diet} onClick={() => handleSubmit(recipe.value)}>
              <figure className={`${styles[recipe.icon]}`}></figure>
              <h4 className={styles.TitleDiet}>{recipe.title}</h4>
            </article>
          )
        )} 
      </div>
      <button onClick={slideRight} className={styles.RightButton}><img src={arrowRight} alt="icon-right" /></button>   
      </section>
    </>
  );
}

export default DietsBar;
