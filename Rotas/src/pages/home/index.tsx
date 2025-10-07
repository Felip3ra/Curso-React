import { Link } from "react-router"

export function Home(){
    return(
        <div>
            <h1>Bem vindo a Home</h1>
            <Link to="/sobre">Ir para Sobre</Link>
        </div>
    )
}