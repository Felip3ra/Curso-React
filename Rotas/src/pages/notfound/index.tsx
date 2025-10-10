import { Link } from "react-router"

export function NotFound(){
    return(
        <div>
            <h1>Página não encontrada</h1>
            <Link to="/">Ir para Home</Link>
        </div>
    )
}