import "./App.css";
import HomePage from "./pages/HomePage";
import StoreProvider from "./store/StoreProvider";

function App() {
  return (
    <>
      <StoreProvider>
        <HomePage />
      </StoreProvider>
    </>
  );
}

export default App;
