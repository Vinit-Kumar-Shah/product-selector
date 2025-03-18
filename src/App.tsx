import AppRouter from "./AppRouter";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="bg-cream-light">
        <AppRouter />
      </main>
    </>
  );
};

export default App;
