import { Fragment } from "react";
import headerImage from "../../assets/food.png";
import logo from "../../assets/logo.jpg";
import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className="header">
        <div className="name">
          <img className="logo" src={logo} alt="icon" />
          <h1 className="app-name">Food App</h1>
        </div>
        <HeaderCartButton openCart={props.openCart} />
      </header>
      <div className="main-image">
        <img src={headerImage} alt="meals" />
      </div>
    </Fragment>
  );
};
export default Header;
