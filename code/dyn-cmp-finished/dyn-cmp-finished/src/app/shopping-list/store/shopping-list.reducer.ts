import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State
}
const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(
  state = initialState, 
  action:ShoppingListActions.ShoppingListActions
){
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: 
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS: 
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT: 
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editedIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: updateIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
      
    case ShoppingListActions.DELETE_INGREDIENT: 
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, idx) => {
          return idx !== state.editedIngredientIndex
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT: 
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload]
    };
    case ShoppingListActions.STOP_EDIT: 
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
    };
    default:
      return state
  }
}