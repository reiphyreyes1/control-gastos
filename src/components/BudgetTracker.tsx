import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

function BudgetTracker() {
    const { state, dispatch, remainingBudget, totalExpenses } = useBudget();

    const percentage = +(totalExpenses / state.budget * 100).toFixed(2)



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    text={`${percentage}% Gastado`}
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#F5F5F5",
                        textSize: 8,
                        textColor: "#3B82F6"
                    })}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase rounded-lg font-bold"
                    onClick={() => dispatch({ type: "restart-app" })}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}

export default BudgetTracker