const Selling = () => {
  return (
    <form className="m-selling">
      <div className="l-selling__main">
        <div className="l-selling__labels">
          <span className="c-selling__label c-ah-price-label">Craft cost</span>
          <span className="c-selling__label c-name-label">Name</span>
          <span className="c-selling__label c-profit-label">Profit</span>          
          <span className="c-sell-all__label">Status</span>                      
        </div>
        <div className="o-item">                
          <span className="c-item__craft-cost">$6000</span>
          <span className="c-item__name">Boots of Kingly Upheaval</span>        
          <span className="c-item__profit">$537</span>                                            
          <button className="c-selling__sold-btn">Sold</button>
        </div>    
      </div>      
    </form>
  );
}
 
export default Selling;