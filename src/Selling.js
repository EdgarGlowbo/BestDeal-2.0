import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Selling = ({ crafts, auctions, setAuctions }) => {
  const markAsSold = async (e, id) => {
    const auctionsObj = structuredClone(auctions);
    await deleteDoc(doc(db, "InSale", id));
    delete auctionsObj[id];
    console.log(auctionsObj);
    setAuctions(auctionsObj);
  }
  return (
    <div className="m-selling">
      <div className="l-selling__main">
        <div className="l-selling__labels">
          <span className="c-selling__label c-ah-price-label">Craft cost</span>
          <span className="c-selling__label c-name-label">Name</span>
          <span className="c-selling__label c-profit-label">Profit</span>          
          <span className="c-sell-all__label">Status</span>                      
        </div>
        <div className="l-selling__items">
          {Object.keys(auctions).map(id => {
            const craftsID = auctions[id].craftID;
            const price = crafts[craftsID].price;
            return (
              <div className="o-item" key={id}>                
                <span className="c-item__craft-cost">${auctions[id].craftCost}</span>
                <span className="c-item__name">{auctions[id].name}</span>        
                <span className="c-item__profit">
                  ${Math.round((price * 0.95) - auctions[id].craftCost)}                
                </span>
                <button className="c-selling__sold-btn" onClick={(e) =>{ markAsSold(e, id)}}>Sold</button>
              </div>
          )})} 
        </div>          
      </div>      
    </div>
  );
}
 
export default Selling;