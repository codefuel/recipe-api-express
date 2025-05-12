import { ApiError } from '../commands/apiError';
import { deleteRecipe } from '../infrastructure/theMealDb';
import {
  getRandomRecipe,
  getRecipeById,
  getRecipeByFirstLetter,
  getRecipeByName,
} from '../infrastructure/theMealDb';

export const lookupRecipeByName = async (name: string) => {
  try {
    const result = await getRecipeByName(name);
    return result.data.meals;
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRecipeByFristLetter = async (letter: string) => {
  try {
    return await getRecipeByFirstLetter(letter);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRecipeById = async (recipeId: number) => {
  try {
    return await getRecipeById(recipeId);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRandomRecipe = async () => {
  try {
    return await getRandomRecipe();
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const deleteRecipeById = async (recipeId: number) => {
  try {
    return await deleteRecipe(recipeId);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};
