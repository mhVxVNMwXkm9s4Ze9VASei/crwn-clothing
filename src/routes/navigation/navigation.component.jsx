import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import "./navigation.styles.scss";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/shop">
            SHOP
          </Link>
          <Link className="navbar-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;