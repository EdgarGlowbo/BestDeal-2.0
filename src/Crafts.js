import { db } from "./firebaseConfig";
import {
  collection, query, orderBy,
  where, updateDoc,
  doc,
} from "firebase/firestore";
import useFetch from "./useFetch";
import React from "react";
import Selling from "./Selling";
import Inventory from "./Inventory";

const Crafts = () => {
  const craftsColRef = collection(db, "Items");
  const currPage = "Tailoring"; // useParams get page user is on
  const q = query(craftsColRef, where("category", "==", currPage), orderBy("profit", "desc"));  
  const { data:crafts, setData:setCrafts } = useFetch(q); // calls useFetch with q to fetch crafts data
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
  const recipes = []; // stores currPage recipes keys to filter mats in inventory 
  return (
    <React.Fragment>
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
            { crafts && Object.keys(crafts).map(item => {                            
              const recipeKeys = Object.keys(crafts[item].recipe);
              recipes.push(...recipeKeys);          
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
                  <input className="c-item__sell-input" type="checkbox" tabIndex={-1} id={item}/>
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
      {recipes.length > 0 && <Inventory recipes={recipes}/>}            
    </React.Fragment>
  );
}
 
export default Crafts;