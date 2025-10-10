import { useParams } from "react-router"

export function Produto(){

    const {id} = useParams();

    return(
        <div>
            <h1>Bem vindo a Produto {id}</h1>
        </div>
    )
}