import { useMemo, useState } from 'react'

import './App.css'

function App() {
  
const [nome, setNome] = useState('')
const [Inputnome, setInputNome] = useState('')
const [anoNasc, setAnoNasc] = useState(0)
const [idade, setIdade] = useState(0)

  const IdadeCalculada = useMemo(() => {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNasc;
  }, [anoNasc]);  

  // function CalculaIdade(){
  //   const anoAtual = new Date().getFullYear();
  //   return anoAtual - anoNasc;
  // }

  function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    setNome(Inputnome);
    setIdade(IdadeCalculada);
    setAnoNasc(0);
  }
  return (
    
      <div>
        <main className='container'>
          <h1 className='title'>Descubra sua idade</h1>
          <form className='form'>
            <label>Digite seu Nome?</label>
            <input type="text" placeholder='Digite seu nome...' className='InputNome' value={Inputnome} onChange={(e) => setInputNome(e.target.value)}/>

            <label>Digite o ano que nasceu?</label>
            <input type="number" placeholder='Digite o ano de nascimento...' className='InputAno' value={anoNasc} onChange={(e) => setAnoNasc(Number(e.target.value))}/>

            <input type="submit" value="Descobrir Idade" className='btn' onClick={(e) => handleSubmit(e)}/>
          </form>
          {
            idade > 0 && nome !== '' && (
              <span className='result'>
                {nome} sua idade é {idade} anos.
              </span>
            )
          }

        </main>
      </div>
      
  )
}

export default App
