import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  postRecipe,
  getCuisines,
  getDishTypes,
  getDiets,
  refreshErrors,
  setErrors,
  getAllRecipes,
  getPage
} from "../../../redux/actions";

import Loader from "../../molecules/Loader/Loader";
import Modal from "../../molecules/Modal/Modal";

import styles from "./CreateRecipe.module.css";

import backBottom from "../../../assets/create/back-bottom.png";
import createRecipe from "../../../assets/create/create-recipe.png";
import iconHome from "../../../assets/create/icon-left.png";
import AsideImg from "../../../assets/create/create-aside.png";
import ScoreImg from "../../../assets/create/score-back.png";
import Divider from "../../../assets/create/top-steps.png";
import NoSteps from "../../../assets/create/no-steps.png";
import NothingYet from "../../../assets/create/nothing-yet.png";
import errorSubmit from "../../../assets/create/error-img.png";


function CreateRecipe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { diets, cuisines, dishtypes, errors, currentRecipe } = useSelector((state) => state);

  const initialInputs = {
    title: "",
    image: "",
    summary: "",
    healthScore: 0,
    readyInMinutes: 0,
    stepValue: "",
    steps: [],
    cuisines: [],
    dishTypes: [],
    diets: [],
  };

  const [inputErrors, setInputErrors] = useState({});
  const [input, setInput] = useState(initialInputs);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setInputErrors(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };



  const addStep = (e, value) => {
    e.preventDefault();
    if(input.stepValue !== ""){
      setInput({
        ...input,
        steps: [...input.steps, value],
        stepValue: "",
      });
      setInputErrors(
        validateInput({
          ...input,
          steps: [...input.steps, value],
        })
      );
    }
    else{
      setInputErrors(
        validateInput({
          ...input,
          steps: [...input.steps, value]
        })
      )
    }
  
  };

  const removeList = (e, index) => {
    e.preventDefault();
    console.log(e.target.name);
    const list = [...input[e.target.name]];
    list.splice(index, 1);
    setInput({
      ...input,
      [e.target.name]: [...list],
    });

    setInputErrors(
      validateInput({
        ...input,
        [e.target.name]: [...list],
      })
    );
  };

  const defaultImage = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      image: "https://i.imgur.com/yXbaJ9u.png",
    });

    setInputErrors(
      validateInput({
        ...input,
        image: "https://i.imgur.com/yXbaJ9u.png",
      })
    );
  };

  const handleSelect = (e) => {
    if (!input[e.target.name].includes(e.target.value)) {
      setInput({
        ...input,
        [e.target.name]: [...input[e.target.name], e.target.value],
      });
      setInputErrors(
        validateInput({
          ...input,
          [e.target.name]: [...input[e.target.name], e.target.value],
        })
      );
    }    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputErrors.title &&
      !inputErrors.image &&
      !inputErrors.summary &&
      !inputErrors.healthScore &&
      !inputErrors.steps &&
      !inputErrors.vegetarian &&
      !inputErrors.vegan &&
      !inputErrors.glutenFree &&
      !inputErrors.dairyFree &&
      !inputErrors.readyInMinutes &&
      !inputErrors.cuisines &&
      !inputErrors.dishTypes &&
      !inputErrors.diets
    ) {
      dispatch(postRecipe(input));
      dispatch(setErrors("POST_RECIPE"));
      setInput(initialInputs);
    } else {
      dispatch(setErrors("FORM_NOT_VALID"));
    }
  };

  function backHome() {
    navigate("/recipes");
  }

  useEffect(() => {
    dispatch(getCuisines());
    dispatch(getDishTypes());
    dispatch(getDiets());

    setTimeout(()=>{
      setInputErrors(
        validateInput({
          ...input
        })
      );
    }, 700)
    
  }, [dispatch]);

  /* regex */
  const noEmpty = /\S+/;
  const validateText = /^(?=.*?[A-Za-z])[A-Za-z+\s]+$/;
  const validateUrl = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
  const validateWords = /^.{150,550}$/;

  const validateInput = (input) => {
    let errors = {};
    if (
      !noEmpty.test(input.title) ||
      !validateText.test(input.title) ||
      input.title.length < 4
    ) {
      errors.title = "Letters only, no special characters or numbers.";
    }
    if (!validateUrl.test(input.image)) {
      errors.image = "Please enter a valid URL.";
    }
    if (!noEmpty.test(input.summary) || !validateWords.test(input.summary)) {
      errors.summary =
        "Letters only, Higher than 150 characters and less than 550";
    }
    if (
      !noEmpty.test(input.healthScore) ||
      input.healthScore < 1 ||
      input.healthScore > 100
    ) {
      errors.healthScore = "Score must be 1 - 100";
    }
    if (
      !noEmpty.test(input.readyInMinutes) ||
      isNaN(input.readyInMinutes) ||
      input.readyInMinutes[0] === "0" ||
      input.readyInMinutes < 5 ||
      input.readyInMinutes > 720
    ) {
      errors.readyInMinutes = "Minutes between 5 and 720";
    }
    if (input.steps.filter((step) => step === "").length > 0) {
      errors.stepValue = "No step should be empty";
    }
    if (input.steps.length === 0) {
      errors.steps = "You need at least 1 step";
    }
    if (input.cuisines.length === 0 || input.cuisines.length > 2) {
      errors.cuisines = "You need to add 1 to 2 cuisines";
    }
    if (input.dishTypes.length === 0 || input.dishTypes.length > 3) {
      errors.dishTypes = "You need to add 1 to 3 dish types";
    }
    if (input.diets.length === 0 || input.diets.length > 5) {
      errors.diets = "You need to add 1 to 5 diets";
    }
    return errors;
  };

  function seeRecipe(e) {
    e.preventDefault();
    navigate(`/recipes/${currentRecipe.data.id}`);
    dispatch(refreshErrors());
    dispatch(getAllRecipes());
    dispatch(getPage(1));
  }

  function stayHere(e) {
    e.preventDefault();
    dispatch(refreshErrors());
    dispatch(getAllRecipes());
    dispatch(getPage(1));
  }

  return (
    <>
      {errors === "POST_RECIPE" &&
        <Modal>
          <img className={styles.imgModal} src={createRecipe}  alt="recipe-created-img"/>
          <h2 className={styles.TitleModal}>Your Recipe has been Added</h2>
          <span className={styles.TextModal}>You can keep adding more recipes as you want.</span>
          <div className={styles.ButtonContainer} >
            <button className={styles.ButtonRecipe} onClick={(e)=> seeRecipe(e)}>See Recipe</button>
            <button className={styles.ButtonStay} onClick={(e)=> stayHere(e)}>Stay Here</button>
          </div>
        </Modal>
      }
      {errors === "FORM_NOT_VALID" &&
        <Modal>
          <img className={styles.imgModal} src={errorSubmit}  alt="error-submit"/>
          <h2 className={styles.TitleModal}>Error, Sending the Recipe</h2>
          <span className={styles.TextModal}>Please, complete the required fields</span>
          <div className={styles.ButtonContainer} >
            <button className={styles.ButtonRecipe} onClick={()=> dispatch(refreshErrors())}>Ok</button>
          </div>
        </Modal>
      }
      {diets.length === 0 ? (
        <div className={styles.LoadingContainer}>
          {" "}
          <Loader />
        </div>
      ) : (
        <section className={styles.CreateContainer}>
          <button onClick={backHome} className={styles.ButtonHome}>
            <img src={iconHome} className={styles.IconHome} alt="img-iconHome" />
            Back
          </button>
          <div className={styles.CreateFormContainer}>
          <aside className={styles.Aside}><img src={AsideImg} alt="aside-img" /></aside>
          <div className={styles.CreateForm}>
            
            <h2 className={styles.Title}>Create a new Recipe</h2>

            <form
              className={styles.Form}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <section className={styles.FormTop}>
                <section className={styles.FormLeft}>
                  <div className={styles.InputContainer}>
                    <span className={inputErrors.title ? styles.Errors : styles.NoErrors}>{inputErrors.title}</span>
                    <input
                      className={styles.Input}
                      type="text"
                      name="title"
                      placeholder="Recipe´s Title"
                      value={input.title}
                      onChange={(e) => handleChange(e)}
                    />
                    <i className={styles.IconInput}></i>
                  </div>

                  <div className={styles.InputContainer}>
                    <span className={inputErrors.summary ? styles.Errors : styles.NoErrors}>{inputErrors.summary}</span>
                    <textarea
                      className={styles.Input}
                      type="text"
                      name="summary"
                      placeholder="Type Summary"
                      value={input.summary}
                      rows="4"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  
                  <div className={styles.SelectContainerRange}>
                    
                    <div className={styles.ContainerRange}>
                    <h3>Score & Preparation time</h3>
                    <div className={styles.InputContainerRange}>
                      <span className={inputErrors.healthScore ? styles.Errors : styles.NoErrors}>
                        {inputErrors.healthScore}
                      </span>
                      <input
                        className={styles.InputRange}
                        type="range"
                        name="healthScore"
                        min="0"
                        max="100"
                        step="5"
                        value={input.healthScore}
                        onChange={(e) => handleChange(e)}
                      />
                      <span className={styles.healthScoreLabel}>
                        HealthScore: <b>{input.healthScore}</b>
                      </span>
                      </div>
                      <div className={styles.InputContainer}>
                      <span className={inputErrors.readyInMinutes ? styles.Errors : styles.NoErrors}>
                        {inputErrors.readyInMinutes}
                      </span>
                      <input
                        className={`${styles.InputRange2} ${styles.InputGreen}`}
                        type="text"
                        name="readyInMinutes"
                        placeholder="Ready in minutes..."
                        value={input.readyInMinutes}
                        onChange={(e) => handleChange(e)}
                      />
                      <i className={styles.IconInputMinute}></i>
                      </div>
                    </div>

                    <div className={styles.ContainerMin}>
                      <img src={ScoreImg} alt="img-score-back" />
                    </div>
                  </div>
                  <img className={styles.Divider} src={Divider} alt="img-divider" />
                  <section className={styles.ContainerStepInput}>
                  <div className={styles.InputContainer}>
                    <div className={styles.StepInputs}>
                      <h4 className={styles.TitleSteps}>Step by Step</h4>
                      <span className={inputErrors.steps || inputErrors.stepValue ? styles.Errors : styles.NoErrors}>
                        {inputErrors.steps || inputErrors.stepValue}
                      </span>
                      <div className={styles.Step}>
                        <textarea
                          className={styles.Input}
                          type="text"
                          name="stepValue"
                          placeholder="Type Step"
                          rows="2"
                          value={input.stepValue}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.StepButtonAdd}>
                    {input.steps.length < 8 && (
                      <button
                        disabled={input.stepValue === "" && true}
                        onClick={(e) => addStep(e, input.stepValue)}
                      >
                        Add Step
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.OutputContainerStep}>
                    <img className={input.steps.length > 0 ? styles.WithSteps : styles.NoSteps} src={NoSteps} alt="no-steps-yet" />
                    {input.steps.length > 0 &&
                      input.steps?.map((step, index) => (
                        <div key={index} className={styles.ContainerListStep}>
                          <span className={styles.StepCount}>
                            Step {index + 1}
                          </span>
                          <span className={styles.OutputLabel}>{step}</span>
                          {input.steps.length > 0 && (
                            <button
                              name="steps"
                              onClick={(e) => removeList(e, index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                  </div>

                  </section>
                </section>
                <section className={styles.FormRight}>
                  <div className={styles.ImageRecipe}>
                    <img
                      src={
                        inputErrors.image || input.image === ""
                          ? "https://i.imgur.com/YywJfaW.png"
                          : input.image
                      }
                      alt="img-no-recipe"
                    />
                    <button
                      className={styles.ButtonImage}
                      onClick={(e) => defaultImage(e)}
                    >
                      Use Default Image
                    </button>
                  </div>

                  <div className={styles.InputContainer}>

                    <span className={inputErrors.image ? styles.Errors : styles.NoErrors}>{inputErrors.image}</span>
                    <input
                      className={styles.Input}
                      type="text"
                      name="image"
                      placeholder="Url Recipe´s Image"
                      value={input.image}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className={styles.SelectContainer}>

                    <span className={inputErrors.cuisines ? styles.Errors : styles.NoErrors}>{inputErrors.cuisines}</span>
                    <select
                      className={styles.SelectCreate}
                      value={
                        input.cuisines.length === 0
                          ? ""
                          : input.cuisines[input.cuisines.length - 1]
                      }
                      name="cuisines"
                      onChange={(e) => {
                        handleSelect(e);
                      }}
                    >
                      <option value="" disabled defaultValue hidden>
                        Recipe´s Cuisines:
                      </option>
                      {cuisines &&
                        cuisines?.map((cuisine, index) => (
                          <option value={cuisine.name} key={index}>
                            {cuisine.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles.OutputContainer}>
                  <img className={input.cuisines.length > 0 ? styles.WithSteps : styles.NothingYet} src={NothingYet} alt="nothing-yet" />
                    {input.cuisines.length > 0 &&
                      input.cuisines?.map((cuisine, index) => (
                        <div key={index} className={styles.ContainerList}>
                          <span className={styles.OutputLabel}>{cuisine}</span>
                          {input.cuisines.length > 0 && (
                            <button
                              name="cuisines"
                              onClick={(e) => removeList(e, index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className={styles.SelectContainer}>
                    <span className={inputErrors.dishTypes ? styles.Errors : styles.NoErrors}>{inputErrors.dishTypes}</span>
                    <select
                      className={styles.SelectCreate}
                      value={
                        input.dishTypes.length === 0
                          ? ""
                          : input.dishTypes[input.dishTypes.length - 1]
                      }
                      name="dishTypes"
                      onChange={(e) => {
                        handleSelect(e);
                      }}
                    >
                      <option value="" disabled defaultValue hidden>
                        Recipe´s Dish Types:
                      </option>
                      {dishtypes &&
                        dishtypes?.map((dishtype, index) => (
                          <option value={dishtype.name} key={index}>
                            {dishtype.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles.OutputContainer}>
                  <img className={input.dishTypes.length > 0 ? styles.WithSteps : styles.NothingYet} src={NothingYet} alt="nothing-yet" />
                    {input.dishTypes.length > 0 &&
                      input.dishTypes?.map((dishType, index) => (
                        <div key={index} className={styles.ContainerList}>
                          <span className={styles.OutputLabel}>{dishType}</span>
                          {input.dishTypes.length > 0 && (
                            <button
                              name="dishTypes"
                              onClick={(e) => removeList(e, index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className={styles.SelectContainer}>
                    <span className={inputErrors.diets ? styles.Errors : styles.NoErrors}>{inputErrors.diets}</span>
                    <select
                      className={styles.SelectCreate}
                      value={
                        input.diets.length === 0
                          ? ""
                          : input.diets[input.diets.length - 1]
                      }
                      name="diets"
                      onChange={(e) => {
                        handleSelect(e);
                      }}
                    >
                      <option value="" disabled defaultValue hidden>
                        Recipe´s Diets:
                      </option>
                      {diets &&
                        diets?.map((diet, index) => (
                          <option value={diet.name} key={index}>
                            {diet.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles.OutputContainer}>
                  <img className={input.diets.length > 0 ? styles.WithSteps : styles.NothingYet} src={NothingYet} alt="nothing-yet" />
                    {input.diets.length > 0 &&
                      input.diets?.map((diet, index) => (
                        <div key={index} className={styles.ContainerList}>
                          <span className={styles.OutputLabel}>{diet}</span>
                          {input.diets.length > 0 && (
                            <button
                              name="diets"
                              onClick={(e) => removeList(e, index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </section>
              </section>

              <button className={styles.ButtonSubmit} type="submit">
                Submit Recipe
              </button>
            </form>

            <img
              className={styles.BackBottom}
              src={backBottom}
              alt="pattern-bottom"
            />
          </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CreateRecipe;
