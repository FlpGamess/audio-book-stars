import { useState, useRef, useEffect } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Capa from "./assets/starscapa.png";
import Capas from "./Capas";
import SeletorCapitulos from "./SeletorCapitulos";
import BotoesControle from "./BotoesControle";
import livro from "./assets/capitulos/livro";
import GerenciadorFaixa from "./GerenciadorFaixa";
import ContainerProgresso from "./ContainerProgresso";
function App() {
  //let taTocando = false;
  //variavel de estado, um array com a variavel e a função
  //definirTaTocando é onde muda o valor de taTocando
  const [taTocando, definirTaTocando] = useState(false);
  const [faixaAtual, definirFaixaAtual] = useState(0);
  const [tempoTotalFaixa, definirTempoTotalFaixa] = useState(0);
  const [tempoAtualFaixa, definirTempoAtualFaixa] = useState(0);
  const tagAudio = useRef(null);
  const barraProgresso = useRef(null);
  //se faixaAtual for alterada, ele verifica se taTocando é true, se for ele executa a função tocarfaixa()
  useEffect(() => {
    if (taTocando) {
      tocarfaixa();
    }
  }, [faixaAtual]);

  const informacoesLivro = {
    nome: "Livro de Regras Stars",
    autor: "Jusé Filipe Alves de Oliveira",
    totalCapitulos: 2,
    capa: Capa,
    capitulos: livro,
    textoAlternativo: "Capa do livro Livro de Regras Stars",
  };

  function tocarfaixa() {
    tagAudio.current.play();
    definirTaTocando(true);
  }

  const pausarfaixa = () => {
    tagAudio.current.pause();
    definirTaTocando(false);
  };

  const tocarouPausarFaixa = () => {
    if (taTocando) {
      pausarfaixa();
    } else {
      tocarfaixa();
    }
  };

  const avancarFaixa = () => {
    if (informacoesLivro.totalCapitulos === faixaAtual + 1) {
      definirFaixaAtual(0);
    } else {
      definirFaixaAtual(faixaAtual + 1);
    }
  };

  const retrocederFaixa = () => {
    if (faixaAtual === 0) {
      definirFaixaAtual(informacoesLivro.totalCapitulos - 1);
    } else {
      definirFaixaAtual(faixaAtual - 1);
    }
  };

  const avancar15s = () => {
    tagAudio.current.currentTime += 15;
  };
  const retroceder15s = () => {
    tagAudio.current.currentTime -= 15;
  };

  const avancarPara = (evento) => {
    const largura = barraProgresso.current.clientWidth;
    const novoTempo = (evento.nativeEvent.offsetX / largura) * tempoTotalFaixa;
    tagAudio.current.currentTime = novoTempo;
  };
  return (
    <>
      <Capas
        Capa={informacoesLivro.capa}
        textoAlternativo={informacoesLivro.textoAlternativo}
      />
      <SeletorCapitulos capituloAtual={faixaAtual + 1} />
      <GerenciadorFaixa
        faixa={informacoesLivro.capitulos[faixaAtual]}
        referencia={tagAudio}
        definirTempoTotalFaixa={definirTempoTotalFaixa}
        definirTempoAtualFaixa={definirTempoAtualFaixa}
      />
      <ContainerProgresso
        tempoTotalFaixa={tempoTotalFaixa}
        tempoAtualFaixa={tempoAtualFaixa}
        referencia={barraProgresso}
        avancarPara={avancarPara}
      />
      <BotoesControle
        taTocando={taTocando}
        tocarouPausarFaixa={tocarouPausarFaixa}
        avancarFaixa={avancarFaixa}
        retrocederFaixa={retrocederFaixa}
        avancar15s={avancar15s}
        retroceder15s={retroceder15s}
      />
    </>
  );
}

export default App;
