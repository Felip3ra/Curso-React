// Importa o hook useState do React para gerenciar estados locais no componente
import { useState } from 'react';

// Componente principal da aplicação: uma lista de tarefas com funcionalidades de adicionar, editar e excluir
export default function App() {

  // Estado que armazena a lista de tarefas (array de strings)
  const [tasks, setTasks] = useState<string[]>([
    'Estudar React',
    'Estudar TypeScript',
    'Estudar Node.js',
  ]);

  // Estado que controla o valor digitado no campo de entrada (input)
  const [inputValue, setInputValue] = useState('');

  // Estado que controla se o modo de edição está ativo e qual tarefa está sendo editada
  const [editTask, setEditTask] = useState({
    enable: false,   // Indica se estamos no modo de edição
    task: ''         // Armazena o texto original da tarefa que está sendo editada
  });

  // Função chamada ao clicar no botão "Adicionar" ou "Atualizar"
  function handleRegister() {
    // Validação: impede que tarefas vazias sejam adicionadas ou salvas
    if (!inputValue) {
      alert('Digite uma tarefa');
      return;
    }

    // Se estivermos no modo de edição, chama a função de salvar a edição
    if (editTask.enable) {
      handleSaveEdit();
      return;
    }

    // Caso contrário, adiciona uma nova tarefa à lista
    setTasks(tarefas => [...tarefas, inputValue]);
    // Limpa o campo de entrada após adicionar
    setInputValue('');
  }

  // Função para excluir uma tarefa da lista
  function handleDelete(item: string) {
    // Cria um novo array sem a tarefa a ser excluída (usando filter)
    const removeTask = tasks.filter(task => task !== item);
    // Atualiza o estado com a nova lista
    setTasks(removeTask);
  }

  // Função que salva a edição de uma tarefa existente
  function handleSaveEdit() {
    // Encontra o índice da tarefa original na lista
    const findIndexTask = tasks.findIndex(task => task === editTask.task);

    // Cria uma cópia do array de tarefas para evitar mutação direta
    const allTasks = [...tasks];
    // Substitui a tarefa antiga pelo novo valor digitado no input
    allTasks[findIndexTask] = inputValue;

    // Atualiza a lista de tarefas com a versão editada
    setTasks(allTasks);

    // Desativa o modo de edição e reseta os dados de edição
    setEditTask({
      enable: false,
      task: ''
    });

    // Limpa o campo de entrada
    setInputValue('');
  }

  // Função chamada ao clicar em "Editar" em uma tarefa
  function handleEdit(item: string) {
    // Preenche o campo de entrada com o texto da tarefa a ser editada
    setInputValue(item);
    // Ativa o modo de edição e armazena a tarefa original
    setEditTask({
      enable: true,
      task: item
    });
  }

  // Renderização do componente
  return (
    <div>
      <h1>Lista de Tarefas</h1>

      {/* Campo de texto controlado pelo estado 'inputValue' */}
      <input
        type="text"
        placeholder="Digite uma tarefa"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      {/* Botão que muda o texto conforme o modo (Adicionar ou Atualizar) */}
      <button onClick={handleRegister}>
        {editTask.enable ? "Atualizar" : "Adicionar"}
      </button>

      <hr />

      {/* Renderiza cada tarefa com botões de editar e excluir */}
      {tasks.map((item, index) => (
        <section key={item}> {/* ⚠️ Idealmente, use um ID único como key */}
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}