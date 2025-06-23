const BotoesControle = (props) => {
  return (
    <div className="caixa-botoes">
      <button>
        <i className="bi bi-skip-start" />
      </button>
      <button>
        <i className="bi bi-arrow-counterclockwise" />
      </button>
      <button onClick={() => props.definirTaTocando(true)}>
        <i
          className={`bi bi-${props.taTocando ? "pause" : "play"}-circle-fill `}
        />
      </button>
      <button>
        <i className="bi bi-arrow-clockwise" />
      </button>
      <button>
        <i className="bi bi-skip-end" />
      </button>
    </div>
  );
};

export default BotoesControle;
