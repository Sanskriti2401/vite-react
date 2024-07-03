import { Link } from "react-router-dom";

import MiniCart from "cart/MiniCart";
import Login from "cart/Login";
import "./Header.css"; // Import the CSS file

function Header(){
  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/">Fidget Spinner World</Link>
          <div className="separator">|</div>
          <Link id="cart" to="/cart">Cart</Link>
        </div>
        <div className="header-right">
          <MiniCart />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Header;
