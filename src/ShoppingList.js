const ShoppingList = () => {
  return (
    <div className="m-shopping-list">
      <h1 className="c-shopping-list__h1">Shopping List</h1>
      <div className="l-shopping-list__items">
        <div className="o-shopping-list__item">                  
          <a className="c-shopping-list__item-name q3" data-wowhead="item=2828">[Example 1]</a>
          <span className="c-shopping-list__item-quantity">22</span>
        </div>
      </div>
      <button className="c-buyout-btn">Buyout</button>
    </div>
  );
}
 
export default ShoppingList;