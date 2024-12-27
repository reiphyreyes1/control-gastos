import { formatCurrency } from "../helpers"

interface Props {
    amount: number
    label: string
}

function AmountDisplay({ label, amount }: Props) {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label}:{' '}
            <span className="font-black text-black">{formatCurrency(amount)}</span>
        </p>
    )
}

export default AmountDisplay