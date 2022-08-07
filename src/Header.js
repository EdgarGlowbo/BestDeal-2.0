import { Path, BrowserRouter } from "react-router-dom";
const Header = () => {
  return (    
    <div className="l-header">
      <h1 className="c-header-h1">BestDeal</h1>
      <nav className="l-nav">       
        <div className="c-tab-label c-tab-label--first">Blacksmithing</div>
        <div className="c-tab-label">Leatherworking</div>
        <div className="c-tab-label">Tailoring</div>
        <div className="c-tab-label">Others</div>
        <div className="c-tab-label">Materials</div>
      </nav>      
    </div>
  );
}
 
export default Header;