import { db } from "./firebaseConfig";
import {
  collection, query, orderBy,
  where,
} from "firebase/firestore";
import useFetch from "./useFetch";
import React from "react";
import Selling from "./Selling";
import Inventory from "./Inventory";

const Crafts = () => {
  const craftsColRef = collection(db, "Items");
  const currPage = "Blacksmithing"; // useParams get page user is on
  const q = query(craftsColRef, where("category", "==", currPage), orderBy("profit", "desc"));  
  const { data:crafts } = useFetch(q); // calls useFetch with q to fetch crafts data
  const recipes = [];  
  return (
    <React.Fragment>
      <form className="m-crafts">
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
            { crafts && crafts.map(item => {
              const data = item.data();
              const recipeKeys = Object.keys(data.recipe);
              recipes.push(...recipeKeys);          
              return (
                <li className="o-item" key={data.id}>                
                  <input className="c-item__ah-price" value={data.price}/>                    
                  <span className="c-item__name">{data.name}</span>        
                  <span className="c-item__profit">${data.profit}</span>                                            
                  <input className="c-item__sell-input" type="checkbox" tabIndex={-1}></input>
                </li>
              );               
            })} 
          </ul>             
        </div>
        <div className="l-crafts__footer">
          <button className="c-crafts__sell-btn">Sell</button>
        </div>
      </form>
      <Selling />                         
      {recipes.length > 0 && <Inventory recipes={recipes}/>}            
    </React.Fragment>
  );
}
 
export default Crafts;