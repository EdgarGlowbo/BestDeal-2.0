import Header from "./Header";
import Crafts from "./Crafts";
import {
  Route, BrowserRouter as Router,  
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [currPage, setCurrPage] = useState("Blacksmithing");
 
  return (
    <Router basename="/BestDeal-2.0">
      <div className="App">
        <Header        
          setCurrPage={setCurrPage}
        />               
        <div className="content">
          <div className="l-main-content">                    
            <Route path='/' exact component={<Crafts currPage={currPage}/>}/>                                           
          </div>                               
        </div>
      </div>      
    </Router>       
  );
}

export default App;
