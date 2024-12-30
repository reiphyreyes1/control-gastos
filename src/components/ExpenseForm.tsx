import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

const initialState: DraftExpense = {
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date()
}

function ExpenseForm() {
    const [expense, setExpense] = useState(initialState);

    const [error, setError] = useState("");

    const { state, dispatch, remainingBudget } = useBudget();
    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(item => item.id === state.editingId)[0]
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount)
        }

    }, [state.editingId])

    const handleChangeDate = (event: Value) => {
        setExpense({ ...expense, date: event })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        const isAmountField = ["amount"].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar
        if (Object.values(expense).includes("") || expense.amount <= 0) {
            setError("Todos los campos son obligatorios");
            return;
        }

        300 + 200
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError("Balance insuficiente");
            return;
        }

        setError("");

        // Add or update expense
        if (state.editingId) {
            dispatch({ type: "update-expense", payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: "add-expense", payload: { expense } });
        }

        setExpense(initialState);
        setPreviousAmount(0);
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >{state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}</legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre del Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>

                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Categoria:</label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Agregar Gasto"}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 uppercase
                    font-bold rounded-lg text-white "
            />


        </form>
    )
}

export default ExpenseForm