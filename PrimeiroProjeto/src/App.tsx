import { Header } from "./components/header";
import { Aluno } from "./components/aluno";
import Footer from "./components/footer";
export default function App() {
  return (
    <div>
      <Header/>
      <Aluno nome="Ana Caroline"/>
      <Aluno nome="Felipe"/>
      <Footer/>
    </div>
  );
}

