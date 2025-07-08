const BotoesControle = ({
  retrocederFaixa,
  tocarouPausarFaixa,
  taTocando,
  avancarFaixa,
  avancar15s,
  retroceder15s,
}) => {
  return (
    <div className="caixa-botoes">
      <button onClick={retrocederFaixa}>
        <i className="bi bi-skip-start" />
      </button>
      <button onClick={retroceder15s}>
        <i className="bi bi-arrow-counterclockwise" />
      </button>
      <button onClick={() => tocarouPausarFaixa()}>
        <i className={`bi bi-${taTocando ? "pause" : "play"}-circle-fill `} />
      </button>
      <button onClick={avancar15s}>
        <i className="bi bi-arrow-clockwise" />
      </button>
      <button onClick={avancarFaixa}>
        <i className="bi bi-skip-end" />
      </button>
    </div>
  );
};

export default BotoesControle;
