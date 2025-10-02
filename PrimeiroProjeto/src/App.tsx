// Importa os hooks useState e useEffect do React
// useState: gerencia estados reativos
// useEffect: executa efeitos colaterais (como carregar dados ao montar o componente)
import { useState, useEffect } from 'react';

// Componente principal da aplicação: lista de tarefas com adição, edição, exclusão e persistência
export default function App() {

  // Estado que armazena a lista de tarefas (inicialmente vazio)
  const [tasks, setTasks] = useState<string[]>([]);

  // Estado que controla o valor atual do campo de entrada (input)
  const [inputValue, setInputValue] = useState('');

  // Estado para gerenciar o modo de edição
  const [editTask, setEditTask] = useState({
    enable: false,   // Indica se o usuário está editando uma tarefa
    task: ''         // Guarda o texto original da tarefa em edição
  });

  // Efeito que carrega as tarefas salvas no localStorage ao montar o componente
  useEffect(() => {
    // Tenta recuperar os dados salvos com a chave "@cursoReact"
    const tarefasSalvas = localStorage.getItem("@cursoReact");
    
    // Se existirem dados salvos, converte de JSON para array e atualiza o estado
    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
    // A dependência vazia [] garante que isso execute apenas uma vez (na montagem)
  }, []);

  // Função acionada ao clicar em "Adicionar" ou "Atualizar"
  function handleRegister() {
    // Validação: impede envio de tarefa vazia
    if (!inputValue.trim()) {
      alert('Digite uma tarefa válida');
      return;
    }

    // Se estiver no modo de edição, salva a alteração
    if (editTask.enable) {
      handleSaveEdit();
      return;
    }

    // Adiciona nova tarefa à lista
    const novaLista = [...tasks, inputValue];
    setTasks(novaLista);

    // Salva a nova lista no localStorage
    localStorage.setItem("@cursoReact", JSON.stringify(novaLista));

    // Limpa o campo de entrada
    setInputValue('');
  }

  // Função para excluir uma tarefa
  function handleDelete(item: string) {
    // Filtra a lista, removendo a tarefa selecionada
    const novaLista = tasks.filter(task => task !== item);
    setTasks(novaLista);

    // Atualiza o localStorage com a lista atualizada
    localStorage.setItem("@cursoReact", JSON.stringify(novaLista));
  }

  // Função que finaliza a edição de uma tarefa
  function handleSaveEdit() {
    // Encontra o índice da tarefa original na lista
    const index = tasks.findIndex(task => task === editTask.task);

    // Cria uma cópia da lista para evitar mutação direta
    const novaLista = [...tasks];
    // Substitui a tarefa antiga pelo novo valor
    novaLista[index] = inputValue;

    // Atualiza o estado com a lista modificada
    setTasks(novaLista);
    // Atualiza o localStorage
    localStorage.setItem("@cursoReact", JSON.stringify(novaLista));

    // Sai do modo de edição
    setEditTask({ enable: false, task: '' });
    // Limpa o campo de entrada
    setInputValue('');
  }

  // Função chamada ao clicar em "Editar"
  function handleEdit(item: string) {
    // Preenche o input com o texto da tarefa a ser editada
    setInputValue(item);
    // Ativa o modo de edição e armazena a tarefa original
    setEditTask({ enable: true, task: item });
  }

  // Renderização do componente
  return (
    <div>
      <h1>Lista de Tarefas</h1>

      {/* Input controlado: seu valor vem do estado inputValue */}
      <input
        type="text"
        placeholder="Digite uma tarefa"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      {/* Botão com texto dinâmico conforme o modo (Adicionar/Atualizar) */}
      <button onClick={handleRegister}>
        {editTask.enable ? "Atualizar" : "Adicionar"}
      </button>

      <hr />

      {/* Renderiza cada tarefa com botões de ação */}
      {tasks.map((item) => (
        <section key={item}> {/* ⚠️ Cuidado: usar 'item' como key pode causar bugs se houver duplicatas */}
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}