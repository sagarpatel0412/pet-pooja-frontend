import axios from "./axios";
import { AxiosError } from "axios";

interface ExpenseParams {
  user_id: number | string;
  category_id: number | string;
  startDate: string;
  endDate: string;
}

const expenseApi = async (params: any) => {
  try {
    // Build the query string from provided parameters
    const queryParams = new URLSearchParams();
    queryParams.append("user_id", params.user_id);

    queryParams.append("category_id", params.category_id);
    queryParams.append("startDate", params.startDate);
    queryParams.append("endDate", params.endDate);

    const response = await axios.get(`/expenses?${queryParams.toString()}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching expenses";
      throw new Error(errorMessage);
    } else {
      throw new Error("Unknown error occurred while fetching expenses");
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

const addExpenseApi = async (data: any) => {
  try {
    const response = await axios({
      url: "/expenses",
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching expenses";
      throw new Error(errorMessage);
    } else {
      throw new Error("Unknown error occurred while fetching expenses");
    }
  }
};

const updateExpenseApi = async (data: any) => {
  try {
    const response = await axios({
      url: `/expenses/${data.id}`,
      method: "PUT",
      data: data,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching expenses";
      throw new Error(errorMessage);
    } else {
      throw new Error("Unknown error occurred while fetching expenses");
    }
  }
};

const deleteExpenseApi = async (data: any) => {
  try {
    const response = await axios({
      url: `/expenses/${data.id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching expenses";
      throw new Error(errorMessage);
    } else {
      throw new Error("Unknown error occurred while fetching expenses");
    }
  }
};

export {
  expenseApi,
  getUsersApi,
  getCategoriesApi,
  addExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
};
