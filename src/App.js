import Header from "./Header";
import Crafts from "./Crafts";

function App() {
  return (    
    <div className="App">
      <Header />
      <div className="content">
        <div className="l-main-content">
          <Crafts />                  
        </div>                               
      </div>
    </div>         
  );
}

export default App;
