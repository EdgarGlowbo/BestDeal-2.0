import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
const Inventory = ({ recipes }) => {
  const recipesSet = new Set(recipes);
  const [data, setData] = useState(null);
  useEffect(() => {                 
    const matsObjs = [];
    recipesSet.forEach(async mat => {
      const docRef = doc(db, "Inventory", mat);
      updateDoc(docRef, { id: docRef.id});
      const docSnapshot = await getDoc(docRef);
      const docObj = docSnapshot.data();      
      matsObjs.push(docObj);
    });
    setData(matsObjs);    
  }, []);  
  return (
    <div className="m-inventory">
      <h1 className="c-inventory__h1">Inventory</h1>        
      <ul className="l-inventory-items">
        { data && 
          data.map((mat) => {            
            return (
              <li className="o-inventory-item" key={mat.id}>
                <span className="c-inventory-item__name">{mat.name}</span>
                <div className="l-price">
                  <span className="c-inventory-item__label">Price:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-price"
                    value={mat.price}                    
                  />
                </div>
                <div className="l-quantity">
                  <span className="c-inventory-item__label">Quantity:</span>
                  <input
                    className="c-inventory-item__input c-inventory-item__input-quantity"
                    value={mat.quantity}                    
                  />
                </div>
              </li>
            );
          })                                                                                         
        }                
      </ul>                  
    </div>        
  );
}
 
export default Inventory;