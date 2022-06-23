import React, {useState, useEffect} from "react";

import styles from "./Slider.module.css";
import dataSlider from "./dataSlider";

function Slider() {

  const [slideIndex, setSlideIndex] = useState(1)

  const moveDot = index => {
      setSlideIndex(index)
  }

  const nextSlide = () => {
    if(slideIndex !== dataSlider.length){
        setSlideIndex(slideIndex + 1)
    } 
    else if (slideIndex === dataSlider.length){
        setSlideIndex(1)
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
        nextSlide();        
    }, 2500);
    console.log("entre");
    return () => clearInterval(interval);
  });


  return (
    <section className={styles.ContainerSlider}>
      {dataSlider.map((slide, index) => {
        return (
          <>
          <div key={slide.id}
            className={slideIndex === index + 1 ? `${styles.Slide} ${styles.ActiveSlide}` : styles.Slide}>
            <img className={styles.Img} src={slide.img} alt="slider-imgs"/>
            <h3 className={styles.TitleSlider}>{slide.title}</h3>
            <span className={styles.subTitleSlider}>{slide.subTitle}</span>
            <img className={styles.Dish} src={slide.dish} alt="dish-a-animation" />
          </div>
          
          </>
        );
      })}

      <div className={styles.ContainerDots}>
        {dataSlider.map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? `${styles.Dot} ${styles.Active}` : styles.Dot}
          ></div>
        ))}
      </div>

    </section>
  );
}

export default Slider;
