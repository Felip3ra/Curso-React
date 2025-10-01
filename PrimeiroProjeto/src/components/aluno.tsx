interface AlunoProps {
  nome: string;
}

export function Aluno({ nome }: AlunoProps) {
  return (
    <div>
      <h2>Componente Aluno</h2>
      <p>Este é um componente adicional chamado Aluno.</p>
      <p>Aluno: {nome}</p>
    </div>
  );
}