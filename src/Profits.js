const Profits = () => {
  return (
    <div className="l-setup-receipt">
      <div className="m-setup">
        <div className="l-gold-threshold">
          <span className="c-setup__label c-gold-threshold__label">Gold threshold:</span>
          <div className="l-setup__inputs">
            <input className="c-setup__input c-gold-threshold__input-slidebar" type="range" step="1000"  max="214000"/>
            <input className="c-setup__input c-gold-threshold__input" value="20000"></input>
          </div>          
        </div>
        <div className="l-profit-range">
          <span className="c-setup__label c-profit-range__label">Profit:</span>
          <div className="l-setup__inputs">
            <input className="c-setup__input c-profit-range__input-slidebar" type="range" step="50" max="5000"/>
            <input className="c-setup__input c-profit-range__input" value="350"></input>
          </div>          
        </div>
      </div>
      <div className="m-receipt">
        <div className="o-purchase-cost">
          <div className="l-receipt__subtotal">
            <span className="c-receipt__subtotal-label c-receipt__label">Subtotal:</span>
            <span className="c-receipt__subtotal-value c-receipt__value">$15000</span>
          </div>
          <div className="l-receipt__total">
            <span className="c-receipt__total-label c-receipt__label">Total:</span>
            <span className="c-receipt__total-value c-receipt__value">$44000</span>
          </div>      
        </div>
        <div className="o-profits">
          <div className="l-profits__estimated">
            <span className="c-profits__estimated-label c-receipt__label">Estimated profits:</span>
            <span className="c-profits__estimated-value c-receipt__value">$5000</span>
          </div>
          <div className="l-profits__net">
            <span className="c-profits__net-label c-receipt__label">Current profits:</span>
            <span className="c-profits__net-value c-receipt__value">-$12300</span>
          </div>      
        </div>
      </div>
    </div>    
  );
}
 
export default Profits;