import { db } from "./firebaseConfig";
import {
  collection, query, orderBy,
  where, updateDoc, doc,
  addDoc
} from "firebase/firestore";
import useFetch from "./useFetch";
import React, { useEffect, useState } from "react";
import Selling from "./Selling";
import Inventory from "./Inventory";
import ShoppingList from "./ShoppingList";
import Buyout from "./Buyout";

const Crafts = () => {
  const craftsColRef = collection(db, "Items");
  const currPage = "Leatherworking"; // useParams get page user is on
  const q = query(craftsColRef, where("category", "==", currPage));    
  const { data:crafts, setData:setCrafts, mats } = useFetch(q); // calls useFetch with q to fetch crafts data
  const inventoryColRef = collection(db, "Inventory");
  const inventoryQ = query(inventoryColRef, orderBy("name"));
  const { data:inventory, setData:setInventory } = useFetch(inventoryQ);
  const [itemID, setItemID] = useState(null);
  const [checkedBox, setCheckedBox] = useState([]);
  const auctionsColRef = collection(db, 'InSale');
  const auctionsQ = query(auctionsColRef, where("category", "==", currPage));
  const { data:auctions, setData:setAuctions } = useFetch(auctionsQ);  // fetchs Selling data
  const [buyoutIsDisplayed, setBuyoutIsDisplayed] = useState(false);
  const [shoppingListKeys, setShoppingListKeys] = useState([]);
  
 // AH price updates with this func
  const updateInfo = async (e, id, ref, value) => {    
    if (typeof value === "number") {
      const name = e.target.name;
      setCrafts({
        ...crafts,
        [id]: {
          ...crafts[id],
          [name]: value,
          profit: name === 'price' ? Math.round((value * 0.95) - crafts[id].craftCost) : crafts[id].profit
      }      
      });
      await updateDoc(ref, {[name]: value });
    }    
  }
  // On selling event checked item's materials are substracted from inventory. Return shoppingListObj with new inventory values
  const substractMats = () => {            
    setInventory(prevInventory => {
      const matsSet = new Set(); // keys of mats so difference is substracted only when currInventory has correct quantities
      const currInventory = structuredClone(prevInventory);
      checkedBox.forEach(craftID => {        
        const recipe = crafts[craftID].recipe;            
        Object.keys(recipe).forEach(mat => {
          matsSet.add(mat);        
          currInventory[mat].quantity -= recipe[mat];                  
        });                                         
      });      
      matsSet.forEach(mat => {          
        // currInventory[mat].difference = prevInventory[mat].quantity - currInventory[mat].quantity;                  
        currInventory[mat].difference = 0; 
      });      
      matsSet.forEach(async mat => {
        const docRef = doc(db, "Inventory", mat);               
        await updateDoc(docRef, {
          quantity: currInventory[mat].quantity,          
        });
      });            
      return currInventory;
    });
    setCheckedBox([]); // empty checkbox          
  }
  // Pass to Selling component the items to be rendered, empty checkedBox arr, uncheck everything, 
  // setShoppingList to original state (with the minus mats), substract mats from inventory
  const sellItems = () => {
    setItemID(null);
    const shoppingList = document.querySelector('.l-shopping-list__items');
    if (shoppingList.children.length === 0) {
      const colRef = collection(db, "InSale"); 
      const auctionsObj = {};    
      substractMats();
      Promise.all(
        checkedBox.map(async item => {        
          document.getElementById(item).checked = false;   //Uncheck everything. Get dom ele by id
          const auctionItem = {
            craftCost: crafts[item].craftCost,
            name: crafts[item].name,      
            category: crafts[item].category,
            craftID: crafts[item].id,
          }      
          const docRef = await addDoc(colRef, auctionItem);
          Object.assign(auctionsObj, {
            ...auctions,
            [docRef.id]: {
              ...auctionItem
            }
          });                
        })
      ).then(() => {
          // setItemID(null);
          // setCheckedBox([]); // empty checkbox  
          setAuctions(auctionsObj); // add items to auctions section
      });  
    } else {
      alert('Not enough items');
    }
         
  };
  // update craft cost and possibly profit
  useEffect(() => {     
    const craftsObj = {...crafts};
    Object.keys(craftsObj).forEach(item => {
      craftsObj[item].craftCost = 0;
      craftsObj[item].profit = 0;
      const recipe = crafts[item].recipe;
      Object.keys(recipe).forEach(mat => {
        craftsObj[item].craftCost += inventory[mat].price * recipe[mat];
      });
      craftsObj[item].profit = Math.round((craftsObj[item].price * 0.95) - craftsObj[item].craftCost);
    });      
    setCrafts(craftsObj);    
  }, [inventory]);
  return (
    <React.Fragment>
      <div className="l-left-side-bar">
        {inventory && <ShoppingList
          mats={mats}
          inventory={inventory}
          setInventory={setInventory}
          crafts={crafts}
          itemID={itemID}
          checkedBox={checkedBox}
          setCheckedBox={setCheckedBox}
          setBuyoutIsDisplayed={setBuyoutIsDisplayed}
          setShoppingListKeys={setShoppingListKeys}
          shoppingListKeys={shoppingListKeys}
        />}        
      </div>
      {buyoutIsDisplayed && shoppingListKeys.length > 0 && <Buyout
        buyoutIsDisplayed={buyoutIsDisplayed}
        setBuyoutIsDisplayed={setBuyoutIsDisplayed}
        shoppingListKeys={shoppingListKeys}
        inventory={inventory}
        setInventory={setInventory}
        mats={mats}
      />}
      <div className="m-crafts">
        <div className="l-crafts__main">
          <div className="l-crafts__labels">
            <span className="c-crafts__label c-ah-price-label">AH price</span>
            <span className="c-crafts__label c-name-label">Name</span>
            <span className="c-crafts__label c-profit-label">Profit</span>
            <div className="l-sell-all">
              <span className="c-sell-all__label">WTS</span>
              {/* <input className="c-sell-all-input" type="checkbox" tabIndex={-1}></input> */}
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
                      onChange={
                        (e) => {
                          const value = parseInt(e.target.value);
                          updateInfo(
                            e,
                            item,
                            doc(db, "Items", item),
                            value !== value ? 0 : parseInt(e.target.value) // NaN is unequal to itself. If value !== value then use 0
                          )
                        }
                      }
                      name="price"
                    />                    
                    <span className="c-item__name">{crafts[item].name}</span>        
                    <span className="c-item__profit">{crafts[item].profit >= 0 ? `$${crafts[item].profit}` : `-$${Math.abs(crafts[item].profit)}`}</span>                                            
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
          <button className="c-crafts__sell-btn" onClick={sellItems}>Sell</button>
        </div>
      </div>
      {auctions && <Selling   
        crafts={crafts}
        auctions={auctions}
        setAuctions={setAuctions}
      />}                       
      {inventory && <Inventory                                         
        mats={mats}
        inventory={inventory}
        setInventory={setInventory}
      />}
    </React.Fragment>
  );
}
 
export default Crafts;