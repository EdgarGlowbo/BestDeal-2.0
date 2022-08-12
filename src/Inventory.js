import { db } from "./firebaseConfig";
import { 
  doc, updateDoc
} from "firebase/firestore";

const Inventory = ({ mats, inventory, setInventory }) => {  
  const updateMatInfo = async (e, id, ref, value) => {        
    const name = e.target.name;
    if (value) {      
      setInventory((prevState) => ({
        ...prevState, // Avoid overwritting the inventory obj
        [id]: {
          ...prevState[id], // Avoid overwritting the inventory[id] obj          
          [name]: value,
          difference: name === 'quantity' ? parseInt(prevState[id].quantity - value) : prevState[id].difference // Calculate diff only if name is quantity
        }      
      }));                
      await updateDoc(ref, {[name]: parseInt(value) });            
    }        
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
                    type="number"
                    value={inventory[mat].price}
                    onChange={(e) => updateMatInfo(e, mat, doc(db, "Inventory", mat), e.target.value)}
                  />
                </div>
                <div className="l-quantity">
                  <span className="c-inventory-item__label">Quantity:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-quantity"
                    name="quantity"
                    type="number"
                    value={inventory[mat].quantity}
                    onChange={(e) => updateMatInfo(e, mat, doc(db, "Inventory", mat), parseInt(e.target.value))}
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