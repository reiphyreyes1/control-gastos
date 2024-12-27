import { useMemo } from "react";
import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";


function App() {
  // const context = useContext(BudgetContext)
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl bg-white shadow-lg rounded-lg mt-10 p-10 mx-auto">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
    </>
  )
}

export default App
