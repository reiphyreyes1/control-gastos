import AmountDisplay from "./AmountDisplay"

function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Grafico de gastos" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase rounded-lg font-bold"
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={1000}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={600}
                />

                <AmountDisplay
                    label="Presupuesto"
                    amount={400}
                />
            </div>
        </div>
    )
}

export default BudgetTracker