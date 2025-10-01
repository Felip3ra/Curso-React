import {useState} from 'react';

export default function App() {

  const [input, setInput] = useState("");
  const [aluno, setAluno] = useState("");
  const [idade, setIdade] = useState(0);
  function mostrarAluno() {
    setAluno(input);
  }

  return (
    <div>
      <h1>Conhecendo o UseState</h1>

      <input type="text" placeholder="Digite o nome" value={input} onChange={(e) => setInput(e.target.value)}/>
      <br /><br />
      <input type="number" placeholder="Digite a idade" value={idade} onChange={(e) => setIdade(Number(e.target.value))}/>
      <br /><br />
      <button onClick={mostrarAluno}>Mostrar Aluno</button>

      <hr />
      <h3>O aluno é: {aluno} com idade: {idade}</h3>
    </div>
  );
}

