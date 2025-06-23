import { useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Capa from "./assets/starscapa.png";
import Capas from "./Capas";
import SeletorCapitulos from "./SeletorCapitulos";
import BotoesControle from "./BotoesControle";

function App() {
  //let taTocando = false;
  //variavel de estado, um array com a variavel e a função
  //definirTaTocando é onde muda o valor de taTocando
  const [taTocando, definirTaTocando] = useState(false);
  const informacoesLivro = {
    nome: "Livro de Regras Stars",
    autor: "Jusé Filipe Alves de Oliveira",
    totalCapitulos: 2,
    capa: Capa,
    textoAlternativo: "Capa do livro Livro de Regras Stars",
  };

  return (
    <>
      <Capas
        Capa={informacoesLivro.capa}
        textoAlternativo={informacoesLivro.textoAlternativo}
      />
      <SeletorCapitulos capituloAtual={1} />
      <BotoesControle
        taTocando={taTocando}
        definirTaTocando={definirTaTocando}
      />
    </>
  );
}

export default App;
