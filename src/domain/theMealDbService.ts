import { ApiError } from '../commands/apiError';
import config from '../commands/getConfig';
import { getRecipe } from '../infrastructure/theMealDb';

export const getRecipeByName = async (name: string) => {
  try {
    const api = config.theMealDb.api;
    const result = await getRecipe(`${api}/search.php?s=${name}`);
    return result.data.meals;
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const getRecipeByFristLetter = async (letter: string) => {
  try {
    const api = config.theMealDb.api;
    return await getRecipe(`${api}/search.php?f=${letter}`);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const api = config.theMealDb.api;
    return await getRecipe(`${api}/lookup.php?i=${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const getRandomRecipe = async () => {
  try {
    const api = config.theMealDb.api;
    return await getRecipe(`${api}/random.php`);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};
