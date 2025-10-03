// Importa os hooks necessários do React:
// - useState: gerencia estados reativos
// - useEffect: executa efeitos colaterais (ex: carregar/salvar no localStorage)
// - useRef: acessa elementos do DOM ou armazena valores mutáveis sem causar re-render
// - useMemo: memoriza cálculos pesados ou derivados para evitar recálculos desnecessários
import { useState, useEffect, useRef, useMemo } from 'react';

// Componente principal da aplicação: lista de tarefas com adição, edição, exclusão, persistência e contador
export default function App() {

  // Referência ao elemento <input> para permitir foco programático (melhora UX)
  const inputRef = useRef<HTMLInputElement>(null);

  // Flag para identificar a primeira renderização (evita salvar no localStorage logo na inicialização)
  const firstRender = useRef(true);

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
      try {
        // ⚠️ Boa prática: usar try/catch ao fazer JSON.parse, pois o localStorage pode conter dados corrompidos
        const parsed = JSON.parse(tarefasSalvas);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (error) {
        console.warn("Erro ao carregar tarefas do localStorage:", error);
        // Opcional: limpar o localStorage em caso de erro
        // localStorage.removeItem("@cursoReact");
      }
    }
    // Dependência vazia: executa apenas uma vez, na montagem do componente
  }, []);

  // Efeito que salva automaticamente as tarefas no localStorage sempre que a lista muda
  useEffect(() => {
    // Ignora a primeira execução (quando o componente é montado e carrega dados do localStorage)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Salva a lista atualizada no localStorage
    localStorage.setItem("@cursoReact", JSON.stringify(tasks));
  }, [tasks]); // Executa sempre que 'tasks' for atualizado

  // Função acionada ao clicar em "Adicionar" ou "Atualizar"
  function handleRegister() {
    // Validação: impede envio de tarefa vazia ou com apenas espaços
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

    // Limpa o campo de entrada
    setInputValue('');
  }

  // Função para excluir uma tarefa
  function handleDelete(item: string) {
    // Cria uma nova lista sem a tarefa selecionada
    const novaLista = tasks.filter(task => task !== item);
    setTasks(novaLista);
    // A persistência ocorrerá automaticamente pelo useEffect acima
  }

  // Função que finaliza a edição de uma tarefa
  function handleSaveEdit() {
    // Encontra o índice da tarefa original na lista
    const index = tasks.findIndex(task => task === editTask.task);

    // Verifica se a tarefa ainda existe (segurança contra alterações concorrentes)
    if (index === -1) return;

    // Cria uma cópia da lista e atualiza a tarefa editada
    const novaLista = [...tasks];
    novaLista[index] = inputValue;

    // Atualiza o estado
    setTasks(novaLista);

    // Sai do modo de edição
    setEditTask({ enable: false, task: '' });
    // Limpa o campo de entrada
    setInputValue('');
  }

  // Função chamada ao clicar em "Editar"
  function handleEdit(item: string) {
    // Preenche o input com o texto da tarefa a ser editada
    setInputValue(item);
    // Ativa o modo de edição
    setEditTask({ enable: true, task: item });

    // Dá foco automático ao campo de entrada para melhorar a experiência do usuário
    inputRef.current?.focus();
  }

  // useMemo: memoriza o cálculo do total de tarefas
  // Evita recalcular desnecessariamente em cada re-render (embora .length seja leve, é um bom exemplo de uso)
  const totalTarefas = useMemo(() => {
    return tasks.length;
  }, [tasks]); // Recalcula apenas quando 'tasks' mudar

  // Renderização do componente
  return (
    <div>
      <h1>Lista de Tarefas</h1>

      {/* Input controlado pelo estado 'inputValue' e com referência para foco programático */}
      <input
        type="text"
        placeholder="Digite uma tarefa"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        ref={inputRef} // Associa a referência ao elemento DOM
      />

      {/* Botão com texto dinâmico conforme o modo atual */}
      <button onClick={handleRegister}>
        {editTask.enable ? "Atualizar" : "Adicionar"}
      </button>

      <hr />

      {/* Exibe o total de tarefas usando o valor memorizado */}
      <strong>Você tem {totalTarefas} tarefa{totalTarefas !== 1 ? 's' : ''}</strong>
      <br />
      <br />

      {/* Renderiza cada tarefa com botões de ação */}
      {tasks.map((item) => (
        <section key={item}> {/* ⚠️ Aviso: usar 'item' como key pode causar problemas se houver duplicatas */}
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}