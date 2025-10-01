import {useState} from 'react';

interface AlunoProps{
  nome: string;
  idade: string;
}

export default function App() {

  const [input, setInput] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [infoAluno, setInfoAluno] = useState<AlunoProps>();
  const [contador, setContador] = useState<number>(0);
  function mostrarAluno() {
    setInfoAluno({
      nome: input,
      idade: idade,
    });
  }
  function adicionar(){
    setContador(contador + 1);
  }
  function subtrair(){
    if(contador === 0) return;
    setContador(contador - 1);
  }
  return (
    <div>
      <h1>Conhecendo o UseState</h1>

      <input type="text" placeholder="Digite o nome" value={input} onChange={(e) => setInput(e.target.value)}/>
      <br /><br />
      <input type="number" placeholder="Digite a idade" value={idade} onChange={(e) => setIdade(e.target.value)}/>
      <br /><br />
      <button onClick={mostrarAluno}>Mostrar Aluno</button>

      <hr />
      <h3>O aluno é: {infoAluno?.nome}</h3>
      <h3>A idade é: {infoAluno?.idade}</h3>
      <hr />
      <br />
      <h1>Contador com UseState</h1>
      <button onClick={adicionar}>+</button>{contador}<button onClick={subtrair}>-</button>
    </div>
  );
}

