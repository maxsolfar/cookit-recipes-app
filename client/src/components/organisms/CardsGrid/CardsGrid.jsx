import React, {useState}  from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from "./CardsGrid.module.css";

import Card from '../../molecules/Card/Card';
import Loader from "../../molecules/Loader/Loader";
import Pagination from "../Pagination/Pagination";
import Header from "../../organisms/Header/Header";
import SortSelect from '../../molecules/SortSelect/SortSelect';

import { refreshErrors, refreshData } from "../../../redux/actions";

import background from "../../../assets/header/vector-background2.png";
import imgNoRecipes from "../../../assets/loader/NO-RECIPES.png";
import imgButtonAdd from "../../../assets/create/new-recipe.png";

import Modal from '../../molecules/Modal/Modal';
import { useNavigate } from 'react-router-dom';

function CardsGrid() {

  const { allRecipes, recipes, savedPage, errors } = useSelector((state)=> state);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState(savedPage);
  const [recipesPerPage] = useState(9);

  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecipe= currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


  function goNewRecipe(){
    navigate("/new-recipe");
  }
 
  return (
    <> 
      {
        errors === "ERROR_SEARCH" && 
          <Modal>
            <img className={styles.imgModal} src={imgNoRecipes}  alt="no-recipes-img"/>
            <h2 className={styles.TitleModal}>Recipes not Found</h2>
            <span className={styles.TextModal}>Seems we not found what you looking for</span>
            <button className={styles.ButtonOk} onClick={()=> dispatch(refreshErrors())}>Ok</button>
          </Modal> 
      }

      {allRecipes.length === 0 ? <Loader /> :
      <>
      <Header paginate={paginate}/>

      {recipes.length === 0 ?
        <Modal>
          <img className={styles.imgModal} src={imgNoRecipes}  alt="no-recipes-img"/>
          <h2 className={styles.TitleModal}>No Recipes</h2>
          <span className={styles.TextModal}>No recipes found for your search</span>
          <button className={styles.ButtonOk} onClick={()=> dispatch(refreshData())}>Reload</button>
        </Modal> : 
      <>

      <section className={styles.MainContainer}>
        
        <div className={styles.Sort}>
          <SortSelect paginate={paginate}/>  
        </div>
        
        <section className={styles.CardsContainer}>
        {currentRecipes && currentRecipes?.map((recipe)=>(
          <Card 
            id={recipe.id}
            title={recipe.title}
            summary={recipe.summary}
            healthScore={recipe.healthScore}
            image={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            cuisines={recipe.cuisines}
            diets={recipe.created === false ? recipe.diets : recipe.diets.map(diet => diet.name.toLowerCase())}
          />
        ))}
        
        <img className={styles.Background} src={background} alt="background-img" />
        <section className={styles.ButtonAddContainer}>
          <img className={styles.ImgButtonAdd} src={imgButtonAdd} alt="background-img" />
          <button onClick={goNewRecipe} className={styles.ButtonAdd}>Add Recipe</button>
        </section>
        
        </section>
      </section>

        <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
        />

      </>


      }
       </>
      } 
    </>
  )
}

export default CardsGrid;