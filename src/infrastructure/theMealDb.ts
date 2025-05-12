import axios from 'axios';

import { ApiError } from '../commands/apiError';

export const getRecipe = async (api: string) => {
  try {
    const response = await axios.get(api);
    return response;
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};
