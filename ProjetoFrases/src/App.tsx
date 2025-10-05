import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
function App() {
  
  const [textoFrase, setTextoFrase] = useState('');
  const [categoria, setCategoria] = useState(0);
  const frases = [
    {
      id: 1,
      categoria: 'Motivação',
      frases: [
        'Acredite em si mesmo e todo o resto virá naturalmente.',
        'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
        'Não espere por oportunidades, crie-as você mesmo.'
      ]
    },
    {
      id: 2,
      categoria: 'Bom dia',
      frases: [
        'Bom dia! Que seu dia seja repleto de alegria e realizações.',
        'Acorde com gratidão e faça deste dia o melhor da sua vida.',
        'Cada amanhecer é uma nova oportunidade para ser feliz. Bom dia!'
      ]
    }
  ];
  function handleSwitchCategory(index: number){
    setCategoria(index);
  }
  function GerarFrase(){
    let numeroAleatorio = Math.floor(Math.random() * frases[categoria].frases.length);

    setTextoFrase(frases[categoria].frases[numeroAleatorio]);
  }
  return (
    <div className='container'>
      <img src={logo} alt="Logo" className='logo'/>

      <h2 className='title'>Categorias</h2>
      <section className='Category-Area'>
        
        {frases.map((item,index) => (
          <button key={item.id} className='Category-Btn' style={{borderWidth: item.categoria === frases[categoria].categoria ? 2 : 0, borderColor: "#1fa4db"}} onClick={() => handleSwitchCategory(index)}>{item.categoria}</button>
        ))}
      </section>
      <button className='Phrase-Btn' onClick={GerarFrase}>Gerar frase</button>

      {textoFrase !== '' && (
        <p className='textoFrase'>{textoFrase}</p>
      )}
    </div>
  )
}

export default App
