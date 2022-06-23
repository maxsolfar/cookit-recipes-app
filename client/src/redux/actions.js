import axios from "axios";

/* GET INFO DB & API*/
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const GET_CUISINES = "GET_CUISINES";
export const GET_DISHTYPES = "GET_DISHTYPES";

export const POST_RECIPES = "POST_RECIPES";

/* Current Page for Pagination*/
export const CURRENT_PAGE = "CURRENT_PAGE";
export const REFRESH_DATA = "REFRESH_DATA";

/* Sorts */
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_SCORE = "SORT_BY_SCORE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

/* Filter by Diet */
export const FILTER_BY_DIET = "FILTER_BY_DIET";


/*Errors */
export const SET_ERRORS = "SET_ERRORS";


function getAllRecipes() {
  return async function (dispatch) {
    try {
      const allRecipes = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: allRecipes.data,
      });
    } catch (error) {
      console.log(`GetAllRecipes ${error}`);
    }
  };
}

function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const recipesByName = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      console.log("fa", recipesByName);
      if(recipesByName.data.length > 0)
      {
        return dispatch({
          type: GET_RECIPES_NAME,
          payload: recipesByName.data,
        });
      }
      else{
        return dispatch({
          type: SET_ERRORS,
          payload: "ERROR_SEARCH",
        });
      }
      
    } catch (error) {
      console.log(`GetRecipesByName ${error}`);
    }
  };
}

function getRecipeDetail(id){
  return async function (dispatch) {
    if(id){
      try {
        const recipeDetail = await axios.get(`http://localhost:3001/recipes/${id}`);
        if(recipeDetail.data){
          return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipeDetail.data,
          });
        }
        else{
          return dispatch({
            type: SET_ERRORS,
            payload: "ERROR_ID",
          });
        }
        
      } catch (error) {
        console.log(`GetRecipeDetail ${error}`);
      }
    }
    else{
      dispatch({ type: GET_RECIPE_DETAIL, payload: {} });
    }
  };
}


function getDiets(){
  return async function (dispatch) {
    try {
      const diets = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: GET_DIETS,
        payload: diets.data,
      });
    } catch (error) {
      console.log(`GetDiets ${error}`);
    }
  };
}


function getCuisines(){
  return async function (dispatch) {
    try {
      const cuisines = await axios.get("http://localhost:3001/cuisines");
      return dispatch({
        type: GET_CUISINES,
        payload: cuisines.data,
      });
    } catch (error) {
      console.log(`GetCuisines ${error}`);
    }
  };
}


function getDishTypes(){
  return async function (dispatch) {
    try {
      const dishTypes = await axios.get("http://localhost:3001/dishtypes");
      return dispatch({
        type: GET_DISHTYPES,
        payload: dishTypes.data,
      });
    } catch (error) {
      console.log(`GetDishTypes ${error}`);
    }
  };
}


function postRecipe(data) {
  return async function (dispatch) {
    try {
      const addRecipe = await axios.post("http://localhost:3001/recipes", data);
      return dispatch({
        type: POST_RECIPES,
        payload: addRecipe,
      });
        
    } catch (error) {
      console.log(`PostRecipe ${error}`);
    }
  };
}

function getPage(num){
  return {
    type: CURRENT_PAGE,
    payload: num
  }
}

function refreshData(){
  return {
    type: REFRESH_DATA,
    payload: null,
  };
}

function refreshErrors(){
  return {
    type: SET_ERRORS,
    payload: "",
  };
}

function setErrors(name){
  return {
    type: SET_ERRORS,
    payload: name
  }
}

/*
* Methods for Filters
*/

function sortNAME(type){
  return {
    type: SORT_BY_NAME,
    payload: type,
  };
}

function sortSCORE(type){
  return {
    type: SORT_BY_SCORE,
    payload: type,
  };
}

function filterOrigin(type){
  return {
    type: FILTER_BY_ORIGIN,
    payload: type,
  }
}

function filterByDiet(name){
  return {
    type: FILTER_BY_DIET,
    payload: name,
  };
}

export { 
  getAllRecipes,
  getRecipesByName,
  getRecipeDetail,
  getDiets,
  getCuisines,
  getDishTypes,
  postRecipe,
  refreshData,
  getPage,
  sortNAME,
  sortSCORE,
  filterByDiet,
  filterOrigin,
  refreshErrors,
  setErrors,
};
