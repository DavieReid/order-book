import useDataFeed from "./client/useDataFeed";
import OrderBook from "./components/OrderBook";

function App() {
  useDataFeed();
  return (
    <div className="App">
      <main>
        <section>
          <OrderBook />
        </section>
      </main>
    </div>
  );
}

export default App;
