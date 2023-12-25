import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {

  return <Router>
    <Switch>
      <Route path="/movie/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>


  /*-------------Coin converter practice

  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [moneyPut, setMoneyput] = useState([]);
  const [selectCoin, setSelectCoin] = useState(0);
  const moneyinput = (event) => {
    setMoneyput(event.target.value);
  }

  const chooseCoin = (e) => {
    setSelectCoin(e.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoin(json);
        setLoading(false)
      });
  }
    , []) //처음 한번만 로딩될때 실행되도록

  return <div>
    <h1>The Coins (Total:{coin.length})</h1>

    {loading ? <strong>Loading...</strong> :
      <select onChange={chooseCoin}>
        {coin.map((coin) => <option key={coin.id} value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>)}

      </select>
    }

    <input onChange={moneyinput}
      value={moneyPut}
      type="number"
      placeholder='$'
    />

    <h3>The Coins you can get : {moneyPut > 0 ? (moneyPut / selectCoin).toFixed(2) : null}</h3>

  </div>

   To do practice---------------------------------------------
  const [toDo, setTodo] = useState("");
  const [ToDos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return
    }
    setTodo("");
    setTodos(currentArray => [toDo, ...currentArray]); //...[Array]를 사용하면 array를 합쳐줌
  }

  return <div>
    <h1>To DO List ({ToDos.length})</h1>
    <form onSubmit={onSubmit}>
      <input value={toDo} onChange={onChange} type="text" placeholder='Write your todo' />
      <button>Add To Do</button>
    </form>
    <hr />
    {ToDos.map((item, index) => <li key={index}>{item}</li>)}
  </div>

  */
}

export default App;
