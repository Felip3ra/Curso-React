import './header.css';

interface HeaderProps {
    title?: string; // Propriedade opcional com valor padrão
}

export function Header({ title = "Curso React + Typescript" }: HeaderProps) {
    return(
        <header className='header'>
            <h1 className='title'>{title}</h1>
            <hr />
        </header>
    )
}