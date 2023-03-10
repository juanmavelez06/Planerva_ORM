import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CompCreatePersonal from "./components/CreatePersonal";
import EditPersonal from "./components/EditPersonal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/"></Route>
          <Route path="/create" element={<CompCreatePersonal/>}></Route>
          <Route path="/edit/:id" element={<EditPersonal/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
