import axios from 'axios';
import config from '../../commands/getConfig';
import { ApiError } from '../../commands/apiError';

const api = config.theMealDb.api;

export const getRecipeByName = async (name: string) => {
  try {
    const response = await axios.get(`${api}/search.php?s=${name}`);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRecipeByFirstLetter = async (letter: string) => {
  try {
    const response = await axios.get(`${api}/search.php?f=${letter}`);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRecipeById = async (recipeId: number) => {
  try {
    const response = await axios.get(`${api}/lookup.php?i=${recipeId}`);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await axios.get(`${api}/random.php`);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const deleteRecipe = async (recipeId: number) => {
  try {
    await axios.delete("");
    return {success: true, message: 'Stubbed delete recipe response'};
  } catch (error) {
    throw new ApiError("Failed to delete recipe");
  }
};
