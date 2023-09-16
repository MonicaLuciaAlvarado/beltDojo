import Editar from "./componentes/Editar";
import Nuevo from "./componentes/Nuevo";
import Todos from "./componentes/Todos";
import {Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div className="Container">
      <Routes>
        <Route path ="/" exact element ={<Todos/>}/>
        <Route path="/pirate/new" element={<Nuevo/>}/>
        <Route path="/editar/:id" element={<Editar/>}></Route>
      </Routes>
    </div>
  )
}

export default App;