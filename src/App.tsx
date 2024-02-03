import "./app.scss"
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import {useState} from "react";

export type Tab = "all" | "favorite"

const App = () => {
  const [activeTab, setActiveChapter] = useState<Tab>('all')

  return (
    <div className="wrapper">
      <Header activeTab={activeTab} setActiveChapter={setActiveChapter}/>
      <div className="content">
        <Routes>
          <Route path='/cat-pinterest/' element={<Home activeTab={activeTab}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
