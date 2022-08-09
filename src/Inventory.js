import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
const Inventory = ({ recipes }) => {
  const recipesSet = new Set(recipes);
  const recipesArr = Array.from(recipesSet);
  // const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
  const updateMatInfo = async (e, id, ref) => {    
    const value = parseInt(e.target.value);    
    const name = e.target.name;
    setValues({
      ...values, // Avoid overwritting the values obj
      [id]: {
        ...values[id], // Avoid overwritting the values[id] obj
        [name]: value,
      }      
    });
    await updateDoc(ref, {[name]: value });
  }
  useEffect(() => { 
    // const matObjs = [];
    const matsObj = {};
    // Promise.all is to only setData after every promise resolves
    Promise.all(
      recipesArr.map(async mat => {
        const docRef = doc(db, "Inventory", mat);      
        const docSnapshot = await getDoc(docRef);
        const docObj = docSnapshot.data();      
        // matObjs.push(docObj);
        Object.assign(matsObj, {[mat]: {
          price: docObj.price,
          quantity: docObj.quantity,
          name: docObj.name,
          id: docObj.id,
        }});
      })).then(() => {        
      // setData(matObjs);
      setValues(matsObj);      
    });    
  }, []); 
  return (
    <div className="m-inventory">
      <h1 className="c-inventory__h1">Inventory</h1>        
      <ul className="l-inventory-items">
        { values && Object.keys(values).map((mat) => {                      
            return (            
              <li className="o-inventory-item" key={mat}>
                <span className="c-inventory-item__name">{values[mat].name}</span>
                <div className="l-price">
                  <span className="c-inventory-item__label">Price:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-price"
                    name="price"
                    type="number"
                    value={values[mat].price}
                    onChange={(e) => updateMatInfo(e, mat, doc(db, "Inventory", mat))}
                  />
                </div>
                <div className="l-quantity">
                  <span className="c-inventory-item__label">Quantity:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-quantity"
                    name="quantity"
                    type="number"
                    value={values[mat].quantity}
                    onChange={(e) => updateMatInfo(e, mat, doc(db, "Inventory", mat))}
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