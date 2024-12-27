import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";


function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBudget(+event.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "add-budget", payload: { budget } });
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget]);

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-nñue-600 font-bold text-center">
                    Definir Presupuesto
                </label>

                <input
                    id="budget"
                    name="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 p-2 w-full text-white uppercase font-black 
                 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm