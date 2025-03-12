import axios from "./axios";
import { AxiosError } from "axios";

const expenseApi = async (): Promise<any> => {
  try {
    const response = await axios.get("/expenses");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      const statusCode = error.response?.status || 500;
      console.error(`Login error with status ${statusCode}:`, errorMessage);
      throw new Error(`Error ${statusCode}: ${errorMessage}`);
    } else {
      // Handle any unknown errors
      console.error("Unknown error occurred during login");
      throw new Error("Unknown error occurred during login");
    }
  }
};

const getUsersApi = async (): Promise<any> => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      const statusCode = error.response?.status || 500;
      console.error(`Login error with status ${statusCode}:`, errorMessage);
      throw new Error(`Error ${statusCode}: ${errorMessage}`);
    } else {
      // Handle any unknown errors
      console.error("Unknown error occurred during login");
      throw new Error("Unknown error occurred during login");
    }
  }
};

const getCategoriesApi = async (): Promise<any> => {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      const statusCode = error.response?.status || 500;
      console.error(`Login error with status ${statusCode}:`, errorMessage);
      throw new Error(`Error ${statusCode}: ${errorMessage}`);
    } else {
      // Handle any unknown errors
      console.error("Unknown error occurred during login");
      throw new Error("Unknown error occurred during login");
    }
  }
};

export { expenseApi, getUsersApi, getCategoriesApi };
