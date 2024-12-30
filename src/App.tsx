import { useEffect, useMemo } from "react";
import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";


function App() {
  // const context = useContext(BudgetContext)
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state.budget));
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state])


  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <section className="max-w-3xl bg-white shadow-lg rounded-lg mt-10 p-10 mx-auto">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </section>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseModal />
          <ExpenseList />
        </main>
      )}
    </>
  )
}

export default App
