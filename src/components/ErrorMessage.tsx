import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

function ErrorMessage({ children }: Props) {
    return (
        <p
            className="bg-red-600 p-2 text-white font-bold text-sm text-center"
        >
            {children}
        </p>
    )
}

export default ErrorMessage