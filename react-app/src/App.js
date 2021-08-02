import MainContainer from "../src/components/MainContainer";
import MainLayout from "../src/layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <MainContainer />
      </MainLayout>
    </div>
  );
}

export default App;
