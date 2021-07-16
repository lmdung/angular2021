import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[]
}
const initialState: State = {
  recipes: [],
}
export function recipesReducer (
  state = initialState, 
  action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipesActions.NEW_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipesActions.UPDATE_RECIPE:
      const recipeUpdate = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };
      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.index] = recipeUpdate;
      return {
        ...state.recipes,
        recipes: updateRecipes,
      }
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state.recipes,
        recipes: state.recipes.filter((recipe, idx) => idx !== action.payload)
      }
    default:
      return state;
  }
}