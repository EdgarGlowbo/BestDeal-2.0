import Header from "./Header";
import Crafts from "./Crafts";
import {
  Route, BrowserRouter as Router,
  Switch
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
            <Switch>
              <Route path='/' exact component={<Crafts currPage={currPage}/>}/>
            </Switch>                                 
          </div>                               
        </div>
      </div>      
    </Router>       
  );
}

export default App;
