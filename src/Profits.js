import { useEffect, useState } from "react";

const Profits = ({ shoppingList, inventory, checkedBox, crafts}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  useEffect(() => {
    let sumSubtotal = 0;
    Object.keys(shoppingList).forEach(mat => {
      if (shoppingList[mat].quantity > 0) {
        sumSubtotal += inventory[mat].price * shoppingList[mat].quantity;
      }      
    });
    setSubtotal(sumSubtotal);
  }, [shoppingList]);
  useEffect(() => {
    let sumTotal = 0;
    let sumProfit = 0;
    if (checkedBox.length > 0) {
      checkedBox.forEach(item => {
        sumTotal += crafts[item].craftCost;
        sumProfit += crafts[item].profit;
      });
    }  
    setTotal(sumTotal);
    setProfit(sumProfit);
  }, [crafts, checkedBox]);
  return (
    <div className="l-setup-receipt">
      {/* <div className="m-setup">
        <div className="l-gold-threshold">
          <span className="c-setup__label c-gold-threshold__label">Gold threshold:</span>
          <div className="l-setup__inputs">
            <input            
              className="c-setup__input c-gold-threshold__input-slidebar"
              type="range"
              // step="1000" 
              // max="214000"              
            />
            <input
              className="c-setup__input c-gold-threshold__input"
              // value="20000"
            />
          </div>          
        </div>
        <div className="l-profit-range">
          <span className="c-setup__label c-profit-range__label">Profit:</span>
          <div className="l-setup__inputs">
            <input              
              className="c-setup__input c-profit-range__input-slidebar"
              type="range"
              // step="50"
              // max="5000"              
            />
            <input
              className="c-setup__input c-profit-range__input"
              // value="350"
            />
          </div>          
        </div>
      </div> */}
      <div className="m-receipt">
        <div className="o-purchase-cost">
          <div className="l-receipt__subtotal">
            <span className="c-receipt__subtotal-label c-receipt__label">Subtotal:</span>
            <span className="c-receipt__subtotal-value c-receipt__value">${subtotal}</span>
          </div>
          <div className="l-receipt__total">
            <span className="c-receipt__total-label c-receipt__label">Total:</span>
            <span className="c-receipt__total-value c-receipt__value">${total}</span>
          </div>      
        </div>
        <div className="o-profits">
          <div className="l-profits__estimated">
            <span className="c-profits__estimated-label c-receipt__label">Estimated profits:</span>
            <span className="c-profits__estimated-value c-receipt__value">{profit >= 0 ? `$${profit}` : `-$${Math.abs(profit)}`}</span>
          </div>
          {/* <div className="l-profits__net">
            <span className="c-profits__net-label c-receipt__label">Current profits:</span>
            <span className="c-profits__net-value c-receipt__value">-$12300</span>
          </div>       */}
        </div>
      </div>
    </div>    
  );
}
 
export default Profits;