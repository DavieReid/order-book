import { useRef } from "react";
import OrderBook from "./components/OrderBook";
import { useNumLevels } from "./hooks/useNumLevels";

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  useNumLevels(appRef);
  return (
    <div className="App" ref={appRef}>
      <main>
        <section>
          <OrderBook />
        </section>
      </main>
    </div>
  );
}

export default App;
