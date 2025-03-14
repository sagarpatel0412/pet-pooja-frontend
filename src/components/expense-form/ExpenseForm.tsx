import type React from "react";

import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Modal from "../modal";
import { useMutation } from "@tanstack/react-query";
import { addExpenseApi, updateExpenseApi } from "../../features/api";
import moment from "moment";
import { toast } from "react-toastify";
import {
  CategoryOption,
  ExpenseFormProps,
  UserOption,
} from "../../features/interface";

export default function ExpenseForm({
  expense,
  users,
  categories,
  onSubmit,
  onClose,
  isOpen,
  title,
  isEdit,
  expenseRefetch,
  categoryRefetch,
  userRefetch,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    category_id: 0,
    amount: "",
    date: "",
    description: "",
    userName: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null);

  const [showEmail, setShowEmailForm] = useState<boolean>(false);

  const { mutate: addExpenseMutate, error } = useMutation({
    mutationFn: addExpenseApi,
    mutationKey: ["addExpense"],
    onSuccess: (data: any) => {
      console.log("Login successful", data);
      if (data) {
        expenseRefetch();
        categoryRefetch();
        userRefetch();
        toast.success(`Task added successfully`);
      }
    },
    onError: (err: Error) => {
      console.error("Login error", err);
      toast.error(`Something went wrong`);
    },
  });

  const { mutate: updateExpenseMutate, error: updateError } = useMutation({
    mutationFn: updateExpenseApi,
    mutationKey: ["updateExpense"],
    onSuccess: (data: any) => {
      console.log("Login successful", data);
      if (data) {
        expenseRefetch();
        categoryRefetch();
        userRefetch();
        toast.success(`Task updated successfully`);
      }
    },
    onError: (err: Error) => {
      console.error("Login error", err);
      toast.error(`Something went wrong`);
    },
  });

  useEffect(() => {
    if (expense && isEdit === true) {
      setFormData({
        user_id: expense.user_id,
        category_id: expense.category_id,
        amount: expense.amount.toString(),
        date: expense.date,
        description: expense.description,
        userName: "",
        email: "",
      });

      const existingUser = users.find((user) => user.id === expense.user_id);
      const existingCategory = categories.find((category: any) => {
        return category.id === expense.category_id;
      });

      if (existingCategory) {
        setSelectedCategory({
          value: existingCategory.id,
          label: existingCategory.name,
        });
      } else {
        setSelectedCategory({
          value: expense.category_id,
          label: expense.category_id.toString(),
        });
      }

      if (existingUser) {
        setSelectedUser({ value: existingUser.id, label: existingUser.name });
      } else {
        setSelectedUser({
          value: expense.user_id,
          label: expense.user_id.toString(),
        });
      }
    }
  }, [expense, isEdit, categories]);

  const handleCategoryChange = (newValue: CategoryOption | null) => {
    setSelectedCategory(newValue);
    if (newValue) {
      setFormData({
        ...formData,
        category_id:
          newValue.value && typeof newValue.value === "number"
            ? newValue.value
            : (newValue as any).value,
      });
    } else {
      setFormData({
        ...formData,
        category_id: 0,
      });
    }
    if (errors.category_id) {
      setErrors({ ...errors, category_id: "" });
    }
  };

  const handleUserChange = (newValue: UserOption | null) => {
    setSelectedUser(newValue);

    if (
      typeof newValue?.value === "string" &&
      newValue.label === newValue.value
    ) {
      setShowEmailForm(true);
    }

    if (typeof newValue?.value === "number") {
      setFormData({
        ...formData,
        email: "",
      });
      setShowEmailForm(false);
    }

    if (newValue) {
      setFormData({
        ...formData,
        user_id: (newValue as any).value,
        userName:
          (newValue as any).value && typeof (newValue as any).value === "number"
            ? ""
            : newValue.label,
      });
    } else {
      setFormData({
        ...formData,
        user_id: 0,
        userName: "",
      });
    }

    if (errors["user_id"]) {
      setErrors({ ...errors, user_id: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.user_id) {
      newErrors.user_id = "User is required";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEdit) {
        const feedData = {
          id: expense?.id,
          amount: formData.amount,
          date: moment(formData.date).format("YYYY-MM-DD"),
          description: formData.description,
        };
        updateExpenseMutate(feedData);
        setFormData({
          user_id: 0,
          category_id: 0,
          amount: "",
          date: "",
          description: "",
          userName: "",
          email: "",
        });
        onClose();
      } else {
        setFormData({
          user_id: 0,
          category_id: 0,
          amount: "",
          date: "",
          description: "",
          userName: "",
          email: "",
        });
        addExpenseMutate(formData);
        onClose();
      }
    }
  };

  const userOptions: UserOption[] = [
    { value: 0, label: "Select User" },
    ...users.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];

  const categoryOptions: CategoryOption[] = [
    { value: 0, label: "Select Category" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="mb-4">
          <label
            htmlFor="user_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User
          </label>
          <CreatableSelect
            id="user"
            name="user"
            value={selectedUser}
            onChange={handleUserChange}
            options={userOptions}
            isClearable
            placeholder="Select or enter user"
            classNamePrefix="react-select"
            isDisabled={isEdit ? true : false}
          />
          {errors.user_id && (
            <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <CreatableSelect
            id="category_id"
            name="category_id"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
            isClearable
            placeholder="Select or enter category"
            classNamePrefix="react-select"
            isDisabled={isEdit ? true : false}
          />
          {errors.category_id && (
            <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
          )}
        </div>

        {showEmail && (
          <div className="mb-4">
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className={`w-full rounded-md border shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {/* {errors.category_id && (
              <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
            )} */}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full rounded-md border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.date ? "border-red-500" : "border-gray-300"
            } shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter expense description"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            {expense ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
