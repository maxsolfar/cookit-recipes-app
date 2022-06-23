import {
  GET_RECIPES,
  GET_RECIPES_NAME,
  GET_RECIPE_DETAIL,
  POST_RECIPES,
  GET_DIETS,
  GET_CUISINES,
  GET_DISHTYPES,
  CURRENT_PAGE,
  REFRESH_DATA,
  SORT_BY_NAME,
  SORT_BY_SCORE,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  SET_ERRORS,
} from "./actions";

const initialState = {
  allRecipes: [],
  recipes: [],
  currentRecipe: {},
  diets: [],
  cuisines: [],
  dishtypes: [],
  recipeDetail: {},
  savedPage: 1,
  errors: "",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        recipes: payload,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: payload,
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: payload,
      };

    
    case GET_DIETS:
      return {
        ...state,
        diets: payload,
      };

    case GET_CUISINES:
      return {
        ...state,
        cuisines: payload,
      };

    case GET_DISHTYPES:
      return {
        ...state,
        dishtypes: payload,
      };

    case POST_RECIPES:
      return {
        ...state,
        currentRecipe: payload,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        savedPage: payload,
      };

    case REFRESH_DATA:
      return {
        ...state,
        recipes: state.allRecipes,
      };

    case SORT_BY_NAME:
      return {
        ...state,
        recipes: state.recipes.sort((a, b) => {
          if(payload === "A-Z"){
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (b.title.toLowerCase() < a.title.toLowerCase()) return 1;
            return 0;
          }
          else{
            if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            return 0;
          }
        }),
      };

    case SORT_BY_SCORE:
      return {
        ...state,
        recipes: state.recipes.sort((a, b) => {
          if(payload === "HIGH_TO_LOW"){
            if (b.healthScore < a.healthScore) return -1;
            if (a.healthScore < b.healthScore) return 1;
            return 0;
          }
          else{
            if (a.healthScore < b.healthScore) return -1;
            if (b.healthScore < a.healthScore) return 1;
            return 0;
          }
        }),
      };

    case FILTER_BY_DIET:
      return {
        ...state,
        recipes: state.allRecipes.filter((recipe) => {
          if (recipe.created === true) {
            let DB = recipe.diets.map((diet) => diet.name).includes(payload);
            return DB;
          }
          const API = recipe.diets?.includes(payload.toLowerCase());
          return API;
        }),
      };

    case FILTER_BY_ORIGIN:
      return {
        ...state,
        recipes: state.allRecipes.filter((recipe) => {
            if(payload === "DB"){
              return recipe.created === true;
            }
            else{
              return recipe.created === false;
            }
        }) 
    }

    case SET_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
}
