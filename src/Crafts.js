import { db } from "./firebaseConfig";
import {
  collection, query, orderBy,
  where, updateDoc, doc,
} from "firebase/firestore";
import useFetch from "./useFetch";
import React, { useState } from "react";
import Selling from "./Selling";
import Inventory from "./Inventory";
import ShoppingList from "./ShoppingList";
import Profits from "./Profits";

const Crafts = () => {
  const craftsColRef = collection(db, "Items");
  const currPage = "Leatherworking"; // useParams get page user is on
  const q = query(craftsColRef, where("category", "==", currPage), orderBy("profit", "desc"));    
  const { data:crafts, setData:setCrafts, mats } = useFetch(q); // calls useFetch with q to fetch crafts data
  const inventoryColRef = collection(db, "Inventory");
  const inventoryQ = query(inventoryColRef, orderBy("name"));
  const { data:inventory, setData:setInventory } = useFetch(inventoryQ);
  const [itemID, setItemID] = useState(null);
  
  
 // AH price updates with this func
  const updateInfo = async (e, id, ref) => {    
    const value = parseInt(e.target.value);    
    const name = e.target.name;
    setCrafts({
      ...crafts,
      [id]: {
        ...crafts[id],
        [name]: value,
      }      
    });
    await updateDoc(ref, {[name]: value });
  }

  return (
    <React.Fragment>
      <div className="l-left-side-bar">
        {inventory && <ShoppingList
          mats={mats}
          inventory={inventory}
          crafts={crafts}
          itemID={itemID}
        />}
        <Profits />
      </div>
      <div className="m-crafts">
        <div className="l-crafts__main">
          <div className="l-crafts__labels">
            <span className="c-crafts__label c-ah-price-label">AH price</span>
            <span className="c-crafts__label c-name-label">Name</span>
            <span className="c-crafts__label c-profit-label">Profit</span>
            <div className="l-sell-all">
              <span className="c-sell-all__label">All:</span>
              <input className="c-sell-all-input" type="checkbox" tabIndex={-1}></input>
            </div>
          </div>
          <ul className="l-crafts__items">
            {               
              crafts && Object.keys(crafts).map(item => {                                                    
                return (
                  <li className="o-item" key={item}>                
                    <input
                      className="c-item__ah-price"
                      value={crafts[item].price}
                      onChange={(e) => { updateInfo(e, item, doc(db, "Items", item)) }}
                      name="price"
                    />                    
                    <span className="c-item__name">{crafts[item].name}</span>        
                    <span className="c-item__profit">${crafts[item].profit}</span>                                            
                    <input className="c-item__sell-input"
                      type="checkbox"
                      tabIndex={-1}
                      id={item}
                      name="checked"
                      onChange={() => { setItemID(new String(item)) }}
                    />
                  </li>
                );               
            })} 
          </ul>             
        </div>
        <div className="l-crafts__footer">
          <button className="c-crafts__sell-btn">Sell</button>
        </div>
      </div>
      <Selling />                         
      <Inventory                                         
        mats={mats}
        inventory={inventory}
        setInventory={setInventory}
      />
    </React.Fragment>
  );
}
 
export default Crafts;