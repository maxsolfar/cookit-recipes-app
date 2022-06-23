import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getRecipeDetail, refreshErrors} from "../../../redux/actions";
import Loader from "../../molecules/Loader/Loader";
import Modal from "../../molecules/Modal/Modal";

import styles from "./RecipeDetail.module.css";

import iconhealthScore from "../../../assets/cards/icon-rating-b.png";
import iconTime from "../../../assets/cards/icon-time.png";
import steps from "../../../assets/detail/steps.png";
import iconHome from "../../../assets/create/icon-left.png";
import noIdRecipe from "../../../assets/detail/id-error.png";


function RecipeDetail() {
  const dispatch = useDispatch();
  const { recipeDetail,errors } = useSelector((state) => state);

  const navigate = useNavigate();

  const { idRecipe } = useParams();

  function backHome() {
    navigate("/recipes");
  }

  

  useEffect(() => {
    dispatch(getRecipeDetail(idRecipe));
    return () => {
      dispatch(getRecipeDetail());
      dispatch(refreshErrors());
    };
    
  }, [dispatch, idRecipe]);


  const helper = (diets) => {
    if(recipeDetail.created){
      let arrayDiets = [];
      diets?.map((diet) => (
        arrayDiets.push(diet.name.toLowerCase())
      ))
      return arrayDiets;
    }
    return diets;
  }
   

  return (
    <>
      
      {errors === "ERROR_ID" &&
        <Modal>
          <img className={styles.imgModal} src={noIdRecipe}  alt="recipe-created-img"/>
          <h2 className={styles.TitleModal}>Recipe's ID doesn't exist.</h2>
          <span className={styles.TextModal}>or you can try again later</span>
          <div className={styles.ButtonContainer} >
            <button className={styles.ButtonOk} onClick={(e)=> backHome(e)}>Ok</button>
          </div>
        </Modal>
      }
      {recipeDetail.id === undefined ? (
        <div className={styles.LoadingContainer}>
          <Loader />
        </div>
      ) : (
        <section className={styles.MainContainer}>
          <button onClick={backHome} className={styles.ButtonHome}>
            <img src={iconHome} className={styles.IconHome} alt="img-iconHome" />
            Back
          </button>
          <div className={styles.DetailContainer}>
    
            <section className={styles.TopContainer}>
              <div className={styles.LeftTop}>
                <span className={styles.Id}>{recipeDetail.id}</span>
                <span className={styles.Title}>{recipeDetail.title}</span>
              </div>
              <div className={styles.RightTop}>
                <div className={styles.Health}>
                  <img className={styles.iconhealthScore} src={iconhealthScore} alt="alt-healthscore" />
                  <b>Health Score:</b>
                  <span className={styles.HealthScore}>{recipeDetail.healthScore}</span>
                </div>
                <hr className={styles.Divider} />
                <div className={styles.Time}>
                  <img className={styles.iconTime} src={iconTime} alt="alt-time" />
                  <b>Ready in:</b>
                  <span className={styles.Minutes}>{recipeDetail.readyInMinutes} min</span>
                </div>
              </div>

            </section>

            <section className={styles.MidContainer}>
            <div className={styles.RightInfo}>
                <section className={styles.DishTypes}>
                  <h3>Dish Types:</h3>
                  <div className={styles.DTypes}>
                    { recipeDetail.dishTypes && recipeDetail.dishTypes?.map((dish) => (
                      recipeDetail.created === true
                      ? <span className={styles.DishType}><i className={styles.IconDish}></i>{dish.name}</span>
                      : <span className={styles.DishType}><i className={styles.IconDish}></i>{dish}</span>
                    ))}
                  </div>
                  
                </section>
                <span className={styles.Summary} dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}></span>
                <div className={styles.Types}>
                  <div>
                  <caption className={helper(recipeDetail.diets).includes("lacto ovo vegetarian") ? styles.Vegetarian : styles.VegetarianDec}></caption>
                  <b>Vegetarian</b>
                  </div>
                  <div>
                  <caption className={helper(recipeDetail.diets).includes("vegan") ? styles.Vegan : styles.VeganDec}></caption>
                  <b>Vegan</b>
                  </div>
                  <div>
                  <caption className={helper(recipeDetail.diets).includes("gluten free") ? styles.GlutenFree : styles.GlutenFreeDec}></caption>
                  <b>Gluten Free</b>
                  </div>
                  <div>
                  <caption className={helper(recipeDetail.diets).includes("dairy free") ? styles.DairyFree : styles.DairyFreeDec}></caption>
                  <b>Dairy Free</b>
                  </div>
                </div>
              </div>
              <div className={styles.LeftInfo}>
                
                <img className={styles.ImgCard} src={recipeDetail.image} alt="character-img" />
                <section className={styles.Cuisines}>
                { recipeDetail.cuisines && recipeDetail.cuisines?.map((cuisine) => (
                  recipeDetail.created === true
                  ? <span className={styles.Cuisine}>{cuisine.name}</span>
                  : <span className={styles.Cuisine}>{cuisine}</span>
                ))}
              </section>
              </div>
              
            </section>

          

          <section className={styles.BottomContainer}>
            
              <section className={styles.Steps}>
        
                <div className={styles.ContainerTitleStep}>
                  {/* <h4 className={styles.TitleSteps}>Step by Step</h4> */}
                  <img src={steps} alt="step-img" />
                </div>
                
                <div className={styles.StepContainer}>
                  <h4 className={styles.TitleSteps}><i className={styles.IconRecipe}></i>Step by Step</h4>
                  { recipeDetail.steps.length > 0 ? recipeDetail.steps?.map((step, index) => (
                    <div className={styles.StepCont}>
                      <span className={styles.IndexStep}>Step {index+1}</span>
                      <span className={styles.Step}>{step}</span>
                    </div>
                  )) : <span className={styles.IndexStep}>No instructions</span> }
                </div>
              </section>

              <div className={styles.BottomCard}>
                <section className={styles.Diets}>
                  { recipeDetail.diets && recipeDetail.diets?.map((diet) => (
                    recipeDetail.created === true
                    ? <span className={styles.Diet}>{diet.name}</span>
                    : <span className={styles.Diet}>{diet}</span>
                  ))} 
                </section>
              </div>

          </section>
          
            


          </div>
        </section>

        
      )}
    </>
  );
}

export default RecipeDetail;
