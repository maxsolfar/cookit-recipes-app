import React from 'react';

import { Link } from 'react-router-dom';

import styles from "./Card.module.css";

import iconhealthScore from "../../../assets/cards/icon-rating-b.png";
import iconTime from "../../../assets/cards/icon-time.png";
import iconLeaf from "../../../assets/cards/icon-leaf.png";

function Card(
  { id,
    title,
    summary,
    healthScore,
    image,
    readyInMinutes,
    cuisines,
    diets
  }) { 

  return (
    <>
      <section className={styles.Card}>

        <div className={styles.LeftCard}>
          <img className={styles.ImgCard} src={image} alt="character-img" />
          <section className={styles.Cuisines}>
              { cuisines && cuisines?.map((cuisine,index) => (
                cuisine.hasOwnProperty("name")
                ? <span key={index} className={styles.Cuisine}>{cuisine.name}</span>
                : <span key={index} className={styles.Cuisine}>{cuisine}</span>
              ))}
          </section>
        </div>

        <div className={styles.RightCard}>
          <div className={styles.Info}>
            <div className={styles.TopCard}>
              <Link className={styles.CardLink} to={`/recipes/${id}`}>
                <h2 className={styles.Title}><img className={styles.LeafIcon} src={iconLeaf} alt="diet-icon"/> {title}</h2>
              </Link>
       
              <div className={styles.BottomCard}>
                <section className={styles.Diets}>
                  { diets && diets?.map((diet, index) => (
                    <span key={index} className={styles.Diet}>{diet}</span>
                  ))} 
                </section>
            </div>
            </div>
            <div className={styles.MidCard}>
              <span className={styles.Summary} dangerouslySetInnerHTML={{ __html: summary.slice(0,260) + "..." }}></span>
            </div>
            <div className={styles.Types}>
              <div>
              <figure className={diets.includes("lacto ovo vegetarian") ? styles.Vegetarian : styles.VegetarianDec}></figure>
              <b>Vegetarian</b>
              </div>
              <div>
              <figure className={diets.includes("vegan") ? styles.Vegan : styles.VeganDec}></figure>
              <b>Vegan</b>
              </div>
              <div>
              <figure className={diets.includes("gluten free") ? styles.GlutenFree : styles.GlutenFreeDec}></figure>
              <b>Gluten Free</b>
              </div>
              <div>
              <figure className={diets.includes("dairy free")  ? styles.DairyFree : styles.DairyFreeDec}></figure>
              <b>Dairy Free</b>
              </div>
            </div>  
          </div>
          <div className={styles.Aside}>
            <div className={styles.Health}>
              <img className={styles.iconhealthScore} src={iconhealthScore} alt="alt-healthscore" />
              <b>Health Score:</b>
              <span className={styles.HealthScore}>{healthScore}</span>
            </div>
            <hr />
            <div className={styles.Time}>
              <img className={styles.iconTime} src={iconTime} alt="alt-time" />
              <b>Ready in:</b>
              <span className={styles.Minutes}>{readyInMinutes} min</span>
            </div>
           
          </div>
        </div>
        
      </section>
     
      
    </>
  )
}

export default Card;