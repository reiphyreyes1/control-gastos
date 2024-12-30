import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {

    const { state } = useBudget();

    const filteredExpenses = state.currentCategory ?
        state.expenses.filter(item => item.category === state.currentCategory) : state.expenses;

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [state])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10" >
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> :
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">
                        Lista de Gastos
                    </p>

                    {
                        filteredExpenses.map(item => (
                            <ExpenseDetail
                                key={item.id}
                                expense={item}
                            />
                        ))

                    }
                </>
            }
        </div>
    )
}

export default ExpenseList