import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'
/**
 * 
 alcool / galosina >= 0.7 -> Gasolina
  alcool / galosina < 0.7 -> Alcool
 * 
 * 
 */

  interface InfoProps{
    title: string,
    gasolina: string | number,
    alcool: string | number
  }

function App() {
  
  const [alcool, setAlcool] = useState(0)
  const [gasolina, setGasolina] = useState(0)
  const [info, setInfo] = useState<InfoProps>()
  function Calcular(event: FormEvent){
    event.preventDefault()

    const calculo : number = (alcool / gasolina);

    if(calculo >= 0.7){
      setInfo({
        title: "Compensa utilizar Gasolina",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool)
      })
      
    }
    else{
      setInfo({
        title: "Compensa utilizar Alcool",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool)
      })
    }
  }

  function formatarMoeda(valor: number){
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
  }
  return (
    
      <div>
        <main className='container'>
          <img src={logoImg} alt="Logo" className='logo'/>
          <h1 className='title'>Qual melhor opcao?</h1>

          <form className='form' onSubmit={Calcular}>
            <label htmlFor="alcool">Preco do Alcool</label>
            <input type="number" id='alcool' placeholder='Ex: 4.59' min="1" step="0.01" required className='input' value={alcool} onChange={(e) => setAlcool(Number(e.target.value))}/>

            <label htmlFor="gasolina">Preco da Gasolina</label>
            <input type="number" id='gasolina' placeholder='Ex: 5.79' min="1" step="0.01" required className='input' value={gasolina} onChange={(e) => setGasolina(Number(e.target.value))}/>

            <input type="submit" value="Calcular" className='button'/>
          </form>

          {info && Object.keys(info).length > 0 && (
            <section className='result'>
            <h2 className='result-title'>{info?.title}</h2>
            <span>Alcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
          )}
        </main>
      </div>
      
      
    
  )
}

export default App
