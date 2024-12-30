import { DraftExpense, Expense } from "../types"
import { v4 as uuId } from "uuid"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal", } |
    { type: "close-modal", } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense["id"] } } |
    { type: "get-expense-by-id", payload: { id: Expense["id"] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "restart-app" } |
    { type: "add-filter-category", payload: { id: Expense["id"] } }

export interface BudgetState {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense["id"]
    currentCategory: Expense["id"]
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;
}

const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: "",
    currentCategory: ""
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        id: uuId(),
        ...draftExpense
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
): BudgetState => {
    if (action.type === "add-budget") {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editingId: ""
        }
    }

    if (action.type === "add-expense") {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === "remove-expense") {
        const newState = state.expenses.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            expenses: newState
        }
    }

    if (action.type === "get-expense-by-id") {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === "update-expense") {
        const newExpenses = state.expenses.map(item => item.id === action.payload.expense.id ?
            action.payload.expense
            : item)

        return {
            ...state,
            expenses: newExpenses,
            editingId: "",
            modal: false
        }
    }

    if (action.type === "restart-app") {
        return {
            ...state,
            budget: 0,
            expenses: [],
        }
    }

    if (action.type === "add-filter-category") {
        return {
            ...state,
            currentCategory: action.payload.id
        }

    }

    return {
        ...state,
    }
}