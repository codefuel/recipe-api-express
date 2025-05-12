import axios from 'axios';

import { ApiError } from '../commands/apiError';

export const getRecipe = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

// TODO: Stubbed as an example
export const deleteRecipe = async (url: string) => {
  try {
    // const response = await axios.delete(url);
    return {success: true, message: 'Stubbed delete recipe response'};
  } catch (error) {
    throw new ApiError("Failed to delete recipe");
  }
};
