import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Main/Sidebar";
import GroupList from "./components/Main/List";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        {" "}
        <Sidebar></Sidebar>
        <GroupList></GroupList>
      </main>
    </div>
  );
}

export default App;
