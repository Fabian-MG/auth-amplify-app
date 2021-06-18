import './App.css';
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react';

function App() {
  const [input, updateInput] = useState({ limit: 5, start: 0 })
  const [coins, setCoins] = useState([])
  const { limit, start } = input

  async function fetchCoins() {
      const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
      setCoins(data.coins)
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  return (<div className="App">
      <h1>Hello from AWS Amplify 🚀</h1>
      <div>
        <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder="limit"
        />
        <input
          placeholder="start"
          onChange={e => updateInputValues('start', e.target.value)}
        />
        <button onClick={fetchCoins}>Fetch Coins</button>
      </div>
      {
         coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div> ))
      }
    </div>
  );
}

export default App;
