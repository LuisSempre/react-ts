import React from "react";
import Input from "./Input";

type Venda = {
  id: string;
  nome: string;
  preco: number;
  status: string;
};

function App() {
  const [inicio, setInicio] = React.useState("");
  const [final, setFinal] = React.useState("");
  const [data, setData] = React.useState<null | Venda[]>(null);

  React.useEffect(() => {
    if (inicio !== "" && final !== "") {
      fetch(`https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`)
        .then((r) => r.json())
        .then((json) => setData(json as Venda[]))
        .catch((error) => console.log(error));
    }
  }, [inicio, final]);

  return (
    <div>
      <div>
        <Input label="Início" type="date" setState={setInicio} value={inicio} />
        <Input label="Final" type="date" setState={setFinal} value={final} />
      </div>
      <ul>
        {data !== null &&
          data.map((venda) => (
            <li key={venda.id}>
              {venda.nome}: {venda.status}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
