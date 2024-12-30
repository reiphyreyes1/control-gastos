import { createContext, Dispatch } from "react";
import { BudgetActions, BudgetState } from "../reducers/budget-reducer";

interface BudgetContextProps {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
    // setFilter: Dispatch<React.SetStateAction<string>>
    // filter: string
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);