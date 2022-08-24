import { db } from "./firebaseConfig";
import { 
  doc, updateDoc
} from "firebase/firestore";

const Inventory = ({ mats, inventory, setInventory }) => {  
  const updateMatInfo = async (e, id, ref, value) => {        
    const name = e.target.name;                             
    setInventory(prevInventory => {      
      if (name === 'quantity') {      
        mats.forEach(mat => prevInventory[mat].difference = 0); // reset every mat diff to 0 
      }  
      return ({
        ...prevInventory,
        [id]: {
          ...prevInventory[id],
          difference: name === 'quantity' ? parseInt(prevInventory[id].quantity - value) : 0,
          [name]: value
        }
      })
    });
    await updateDoc(ref, {[name]: value });
  }
  return (
    <div className="m-inventory">
      <h1 className="c-inventory__h1">Inventory</h1>        
      <ul className="l-inventory-items">
        { inventory && Object.keys(inventory).filter(mat => mats.includes(mat)).map((mat) => {                      
            return (            
              <li className="o-inventory-item" key={mat}>
                <span className="c-inventory-item__name">{inventory[mat].name}</span>
                <div className="l-price">
                  <span className="c-inventory-item__label">Price:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-price"
                    name="price"                    
                    value={inventory[mat].price}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      updateMatInfo(
                        e,
                        mat,
                        doc(db, "Inventory", mat),
                        value !== value ? '' : value
                      )
                    }}
                    autoComplete="off"
                  />
                </div>
                <div className="l-quantity">
                  <span className="c-inventory-item__label">Quantity:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-quantity"
                    name="quantity"                    
                    value={inventory[mat].quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      updateMatInfo(
                        e,
                        mat,
                        doc(db, "Inventory", mat),
                        value !== value ? '' : value
                      )
                    }}
                    autoComplete="off"
                  />
                </div>
              </li>
            )}
          )                                                                                         
        }                
      </ul>                  
    </div>        
  );
}

export default Inventory;