import "./app.scss"
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
