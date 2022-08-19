import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebaseConfig";

const Buyout = ({ buyoutIsDisplayed, setBuyoutIsDisplayed, shoppingListKeys, inventory, setInventory, mats }) => {    
  const buyOnSubmit = async (e) => {
    e.preventDefault();
    e.target.price.focus(); // Set focus on 
    const mat = shoppingListKeys[0];
    const docRef = doc(db, "Inventory", mat);
    let sumPrice = 0;    
    let sumQuantity = 0;    
    const price = parseInt(e.target.price.value);
    const quantity = parseInt(e.target.quantity.value);
    setInventory(prevInventory => {          
      sumPrice = (prevInventory[mat].price * prevInventory[mat].quantity) + (price * quantity); // parenthesis: if quantity is 0 then price is irrelevant
      sumQuantity = prevInventory[mat].quantity + quantity;
      mats.forEach(mat => prevInventory[mat].difference = 0); // reset every mat diff to 0 
      return ({
        ...prevInventory,
        [mat]: {
          ...prevInventory[mat],
          difference: parseInt(prevInventory[mat].quantity - sumQuantity), // What is in inventory minus what is being added.
          price: Math.round(sumPrice / sumQuantity),
          quantity: Math.round(sumQuantity)
        }
      })
    });
    e.target.reset(); // reset form fields
    await updateDoc(docRef, {
      price: sumPrice / sumQuantity,
      quantity: sumQuantity
    });
  }
  // Toggles box-shadow (dark background) when buyout component is displayed
  useEffect(() => {
    if (buyoutIsDisplayed) {
      const buyoutForm = document.querySelector('.m-buyout');       
      buyoutForm.classList.add('m-buyout--focus');
    }      
  }, [buyoutIsDisplayed]);
  useEffect(() => {
    if (shoppingListKeys.length === 0) {
      const buyoutForm = document.querySelector('.m-buyout'); 
      buyoutForm.classList.remove('m-buyout--focus');
      setBuyoutIsDisplayed(false);      
    }  
  }, [shoppingListKeys]);
  return (
    <form
      className="m-buyout"
      onSubmit={(e) => { buyOnSubmit(e) }}
    >
      <h1 className="c-mat-name">
        {inventory[shoppingListKeys[0]].name}
      </h1>
      <div className="o-buyout__options">
        <div className="l-buyout__price">
          <span className="c-buyout__price-label">Price:</span>
          <input
            type="number"
            className="c-buyout__price-input"
            name="price"
            autoComplete="off" 
            autoFocus           
          />
        </div>
        <div className="l-buyout__quantity">
          <span className="c-buyout__quantity-label">Quantity:</span>
          <input
            type="number"
            className="c-buyout__quantity-input"
            name="quantity"
            autoComplete="off"            
          />
        </div>
      </div>
      <div className="l-buyout__btns">
        <button className="c-buyout__cancel" type="button" onClick={() => {
          const buyoutForm = document.querySelector('.m-buyout');                               
          buyoutForm.classList.remove('m-buyout--focus');
          setBuyoutIsDisplayed(false);
        }}>
          Cancel
        </button>
        <button
          className="c-buyout__buy"
          type="submit"          
        >
          Buy
        </button>
      </div>
    </form>
  );
}
 
export default Buyout;