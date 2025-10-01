export default function App() {
  return (
    <div>
      <h1>Meu Primeiro Projeto React com TypeScript</h1>
      <p>Este é um exemplo simples de um componente React escrito em TypeScript.</p>
      <Aluno nome="Ana Caroline"/>
      <Aluno nome="Felipe"/>
    </div>
  );
}

interface AlunoProps {
  nome: string;
}

function Aluno({ nome }: AlunoProps) {
  return (
    <div>
      <h2>Componente Aluno</h2>
      <p>Este é um componente adicional chamado Aluno.</p>
      <p>Aluno: {nome}</p>
    </div>
  );
}