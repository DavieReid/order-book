import "./App.css";
import useDataFeed from "./client/useDataFeed";
import BidTable from "./components/BidTable";
import AskTable from "./components/AskTable";

function App() {
  useDataFeed();
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <section>
          <BidTable />
          <AskTable />
        </section>
      </main>
    </div>
  );
}

export default App;
