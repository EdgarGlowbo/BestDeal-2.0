const Selling = () => {
  return (
    <form className="m-selling">
      <div className="l-selling__main">
        <div className="l-selling__labels">
          <span className="c-selling__label c-ah-price-label">AH price</span>
          <span className="c-selling__label c-name-label">Name</span>
          <span className="c-selling__label c-profit-label">Profit</span>
          <div className="l-sell-all">
            <span className="c-sell-all__label">All:</span>
            <input className="c-sell-all-input" type="checkbox" tabIndex={-1}></input>
          </div>
        </div>
        <div className="o-item">                
          <input className="c-item__ah-price" />                    
          <span className="c-item__name">Boots of Kingly Upheaval</span>        
          <span className="c-item__profit">$537</span>                                            
          <input className="c-item__sell-input" type="checkbox" tabIndex={-1}></input>
        </div>    
      </div>
      <div className="l-selling__footer">
        <button className="c-selling__sold-btn">Sold</button>
      </div>
    </form>
  );
}
 
export default Selling;