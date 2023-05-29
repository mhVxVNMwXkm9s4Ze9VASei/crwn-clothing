import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to="/">
          <div>Logo</div>
        </Link>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/shop">
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;