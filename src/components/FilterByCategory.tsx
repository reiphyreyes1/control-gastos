import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"


function FilterByCategory() {

    // const { setFilter } = useBudget();

    const { dispatch } = useBudget();
    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select
                        className="bg-slate-100 p-3 flex-1 rounded-lg"
                        id="category"
                        onChange={(e) => dispatch({ type: "add-filter-category", payload: { id: e.target.value } })}
                    // onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">
                            -- Todas las categorias --
                        </option>
                        {
                            categories.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default FilterByCategory