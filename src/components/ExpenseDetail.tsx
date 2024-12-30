import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"

interface Props {
    expense: Expense
}

function ExpenseDetail({ expense }: Props) {
    const categoryInfo = useMemo(() => categories.filter(item => item.id === expense.category)[0], [expense])
    const { dispatch } = useBudget();


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => { dispatch({ type: "get-expense-by-id", payload: { id: expense.id } }) }}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 border-b border-gray-200 flex gap-5 items-center w-full">

                    <div>
                        <img
                            className="h-20 w-20"
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt={`Imagen de ${categoryInfo.name}`}
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail