function SeletorCapitulos(props) {
  return (
    <>
      <button className="seletor">
        <i className="bi bi-list-task"></i>
        {
          //String interpolada que aceita variavel
        }
        <p>{`Capitulo ${props.capituloAtual}`}</p>
      </button>
    </>
  );
}

export default SeletorCapitulos;
