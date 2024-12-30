import { ReactNode, useMemo, useReducer } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import { BudgetContext } from "./BudgetContext"

interface BudgetProviderProps {
    children: ReactNode
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // const [filter, setFilter] = useState<Category["id"]>("");

    const totalExpenses = useMemo(() => state.expenses.reduce((total, item) =>
        total + item.amount, 0), [state.expenses]);

    const remainingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses])


    return (
        <BudgetContext.Provider value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget,
            // filter,
            // setFilter
        }}>
            {children}
        </BudgetContext.Provider>
    )
}