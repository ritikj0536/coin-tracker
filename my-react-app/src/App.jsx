import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handlePercentage = () => {
    const updatedPerData = [...coins].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setCoins(updatedPerData);
  };

  const handkeMarketCap = () => {
    const updatedMarketCap = [...coins].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setCoins(updatedMarketCap);
  };

  const filteredCoins = coins.filter(
  (coin) =>
    coin.name.includes(search) ||
    coin.symbol.includes(search)
);

  return (
    <div>
      <input
        placeholder="Search By Name or Symbol"
        type="text"
        value={search}
        onChange={(e) => 
        setSearch(e.target.value)}
      />

      <button onClick={handkeMarketCap}>Sort by Mkt Cap</button>

      <button onClick={handlePercentage}>Sort by percenage</button>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>name</th>
            <th>symbol</th>
            <th>current price</th>
            <th>Total Volume</th>
            <th>24-hour%</th>
            <th>market-cap</th>
          </tr>
        </thead>

        <tbody>
          {filteredCoins.map((coin,index) => (
            <tr key={index}>
              <td>{coin.id}</td>
              <td>
                <img src={coin.image} width="30" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.current_price}</td>
              <td>{coin.total_volume}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
