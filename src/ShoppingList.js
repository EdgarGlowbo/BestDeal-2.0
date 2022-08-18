import React, { useEffect, useState } from "react";
import Profits from "./Profits";
const ShoppingList = ({ mats, inventory, crafts, itemID, checkedBox, setCheckedBox }) => {  
  const createShoppingList = () => {
    const shoppingListObj = {};
    mats.forEach(mat => {      
      Object.assign(shoppingListObj, {
        [mat]: {
          name: inventory[mat].name,
          quantity: 0 - inventory[mat].quantity
        }
      });
    });    
    return shoppingListObj;
  };
  const [shoppingList, setShoppingList] = useState(createShoppingList());
  // update shoppingList on inventory update    
  useEffect(() => {    
    setShoppingList(prevShoppingList => {      
      const currShoppingList = structuredClone(prevShoppingList);
      mats.forEach(mat => {
        currShoppingList[mat].quantity = parseInt(prevShoppingList[mat].quantity + inventory[mat].difference);
      });
      return currShoppingList;
    });
  }, [inventory]);
  // update checkedBox on itemID state change. 
  useEffect(() => {
    if (itemID) {      
      const id = itemID.valueOf();     
      if (checkedBox.includes(id)) { // Action: Uncheck  
        setCheckedBox(checkedBox.filter(item => item !== id));
      } else { // Action: Check            
        const checkedBoxArr = [...checkedBox];
        checkedBoxArr.push(id);
        setCheckedBox(checkedBoxArr);
      }      
    }    
  }, [itemID]);
  useEffect(() => {
    if (itemID) { //Is not null
      const shoppingListObj = {...shoppingList};
      const recipe = crafts[itemID].recipe;
      const id = itemID.valueOf();              
      Object.keys(recipe).forEach((mat) => {
        if (checkedBox.includes(id)) { // Checked
          shoppingListObj[mat].quantity += recipe[mat];
        } else { // Unchecked
          shoppingListObj[mat].quantity -= recipe[mat];
        }     
      });      
      setShoppingList(shoppingListObj); 
    }    
  }, [checkedBox]);
  useEffect(() => {
    console.log(shoppingList);
  }, [shoppingList])
  return (
    <React.Fragment>
      <div className="m-shopping-list">
        <h1 className="c-shopping-list__h1">Shopping List</h1>
        <div className="l-shopping-list__items">
          {shoppingList && Object.keys(shoppingList).filter(mat => shoppingList[mat].quantity > 0).map(mat => {
            return (
              <div className="o-shopping-list__item" key={mat}>                  
                <span className="c-shopping-list__item-name">{shoppingList[mat].name}</span>
                <span className="c-shopping-list__item-quantity">{shoppingList[mat].quantity}</span>
              </div>
            )}         
          )}
        </div>
        <button className="c-buyout-btn">Buyout</button>
      </div>
      {shoppingList && <Profits
        shoppingList={shoppingList}
        inventory={inventory}
        checkedBox={checkedBox}
        crafts={crafts}        
      />}
    </React.Fragment>      
  );
}
 
export default ShoppingList;