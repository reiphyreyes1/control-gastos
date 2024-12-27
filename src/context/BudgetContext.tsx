import { createContext, Dispatch } from "react";
import { BudgetActions, BudgetState } from "../reducers/budget-reducer";

interface BudgetContextProps {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);