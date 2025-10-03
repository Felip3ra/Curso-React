// Importa os hooks necessários do React:
// - useState: gerencia estados reativos
// - useEffect: executa efeitos colaterais (ex: carregar/salvar no localStorage)
// - useRef: acessa elementos do DOM ou armazena valores mutáveis sem causar re-render
// - useMemo: memoriza cálculos derivados para evitar recálculos desnecessários
// - useCallback: memoriza funções para evitar recriações desnecessárias em re-renders
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

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
    const tarefasSalvas = localStorage.getItem("@cursoReact");
    if (tarefasSalvas) {
      try {
        // Validação robusta: evita falhas se o localStorage estiver corrompido
        const parsed = JSON.parse(tarefasSalvas);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (error) {
        console.warn("Erro ao carregar tarefas do localStorage:", error);
        // Opcional: limpar dados inválidos
        // localStorage.removeItem("@cursoReact");
      }
    }
    // Executa apenas na montagem inicial
  }, []);

  // Efeito que salva automaticamente as tarefas no localStorage sempre que a lista muda
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("@cursoReact", JSON.stringify(tasks));
  }, [tasks]);

  // useCallback: memoriza a função handleRegister para evitar recriações em cada re-render
  // Isso é útil se essa função for passada como prop para componentes filhos (mesmo que não seja o caso agora, é uma boa prática em aplicações maiores)
  const handleRegister = useCallback(() => {
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
    setInputValue(''); // Limpa o input após adicionar
  }, [inputValue, tasks, editTask.enable]); // Dependências: tudo que a função usa externamente

  // Função para excluir uma tarefa
  // ⚠️ Poderia ser envolvida em useCallback se passada para filhos, mas aqui é usada inline
  function handleDelete(item: string) {
    const novaLista = tasks.filter(task => task !== item);
    setTasks(novaLista);
    // Persistência automática via useEffect
  }

  // Função que finaliza a edição de uma tarefa
  function handleSaveEdit() {
    const index = tasks.findIndex(task => task === editTask.task);
    if (index === -1) return; // Segurança: tarefa não encontrada

    const novaLista = [...tasks];
    novaLista[index] = inputValue;
    setTasks(novaLista);

    // Reseta o modo de edição
    setEditTask({ enable: false, task: '' });
    setInputValue('');
  }

  // Função chamada ao clicar em "Editar"
  function handleEdit(item: string) {
    setInputValue(item);
    setEditTask({ enable: true, task: item });
    inputRef.current?.focus(); // Foco automático no input
  }

  // useMemo: memoriza o total de tarefas
  // Embora .length seja leve, demonstra boas práticas de otimização
  const totalTarefas = useMemo(() => tasks.length, [tasks]);

  // Renderização do componente
  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        ref={inputRef}
      />

      <button onClick={handleRegister}>
        {editTask.enable ? "Atualizar" : "Adicionar"}
      </button>

      <hr />

      {/* Pluralização correta: "1 tarefa" vs "X tarefas" */}
      <strong>Você tem {totalTarefas} tarefa{totalTarefas !== 1 ? 's' : ''}</strong>
      <br />
      <br />

      {/* Renderiza cada tarefa */}
      {tasks.map((item) => (
        <section key={item}> {/* ⚠️ Aviso: usar o texto como key é arriscado com duplicatas */}
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}