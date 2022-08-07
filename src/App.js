import Header from "./Header";
import ShoppingList from "./ShoppingList";
import Profits from "./Profits";
import Crafts from "./Crafts";

function App() {
  return (    
    <div className="App">
      <Header />
      <div className="content">
        <div className="l-main-content">
          <div className="l-left-side-bar">
            <ShoppingList />
            <Profits />
          </div>
          <Crafts />                  
        </div>                               
      </div>
    </div>         
  );
}

export default App;
