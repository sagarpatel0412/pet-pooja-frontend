import React from "react";

export interface Expense {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface SidebarInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface FilterBarProps {
  categories: { id: number; name: string }[];
  users: { id: number; name: string }[];
  filters: {
    category_id: any;
    user_id: any;
    startDate: string;
    endDate: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category_id: any;
      user_id: any;
      startDate: string;
      endDate: string;
    }>
  >;
}

export interface Expense {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFormProps {
  expense?: Expense;
  users: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  onSubmit: (expense: any) => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  isEdit: boolean;
  expenseRefetch: any;
  userRefetch: any;
  categoryRefetch: any;
}
export interface UserOption {
  value: number | string;
  label: string;
}

export interface CategoryOption {
  value: number | string;
  label: string;
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
  expenseRefetch: any;
  userRefetch: any;
  categoryRefetch: any;
}
