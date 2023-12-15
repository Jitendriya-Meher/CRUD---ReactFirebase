
import NavBar from './components/NavBar';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

      <NavBar></NavBar>

      <Routes>

        <Route exact path='/' element={<Create></Create>}></Route>

        <Route exact path='/all' element={<Read></Read>}></Route>

        <Route exact path='/:id' element={<Update></Update>}></Route>

      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
