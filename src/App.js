import Header from "./Header";
import Crafts from "./Crafts";
import {
  Route, BrowserRouter as Router,
  useRoutes
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [currPage, setCurrPage] = useState("Blacksmithing");
 
  return (
    <Router basename="https://edgarglowbo.github.io/BestDeal-2.0/">
      <div className="App">
        <Header        
          setCurrPage={setCurrPage}
        />        
        <div className="content">
          <div className="l-main-content">          
            <Crafts currPage={currPage}/>                                
          </div>                               
        </div>
      </div>      
    </Router>       
  );
}

export default App;
