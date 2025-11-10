import "./Header.css";
import fridgeIcon from "../../assets/fridge-icon.svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ onButtonClick, formModal }) {
  const [isHamburger, setIsHamburger] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const checkWindowWidth = () => {
    const width = window.innerWidth;

    if (width < 780) {
      setIsHamburger(true);
    } else if (width < 1200) {
      setIsHamburger(true);
    } else if (width < 1400) {
      setIsHamburger(false);
    } else {
      setIsHamburger(false);
    }
  };

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => window.removeEventListener("resize", checkWindowWidth);
  }, []);

  console.log("isHamburger:", isHamburger);

  return (
    <div className="header">
      <Link to="/">
        <div className="header__brand">
          <img
            className="header__brand_icon"
            src={fridgeIcon}
            alt="fridge icon"
          />
          <p className="header__brand_text">Fridge Formulas</p>
        </div>
      </Link>
      {!isHamburger ? (
        <div className="header__dekstop-menu">
          <nav className="header__navbar">
            <ul className="header__navabar_items">
              <li>
                <HashLink to="/#how-it-works" smooth="true" duration={600}>
                  How It Works
                </HashLink>
              </li>
              <li>
                <HashLink to="/#dietary-templates" smooth="true" duration={600}>
                  Dietary Templates
                </HashLink>
              </li>
              <li>
                <Link to="/why-build-it" duration={600}>
                  Why I Built This
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__buttons">
            <button
              className="header__login__button"
              onClick={() => onButtonClick(formModal[0])}
            >
              Log In
            </button>
            <button
              className="header__signup__button"
              onClick={() => onButtonClick(formModal[1])}
            >
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="header__mobile-menu">
          <button
            className="header__mobile-menu-button"
            onClick={() => {setIsMobileOpen(!isMobileOpen);}}>
            ☰
          </button>
          {isMobileOpen?(
            <div className="header__mobile-menu-items">
               <nav className="header__navbar">
            <ul className="header__mobile__navabar_items">
              <li>
                <HashLink to="/#how-it-works" smooth="true" duration={600}>
                  How It Works
                </HashLink>
              </li>
              <li>
                <HashLink to="/#dietary-templates" smooth="true" duration={600}>
                  Dietary Templates
                </HashLink>
              </li>
              <li>
                <Link to="/why-build-it" duration={600}>
                  Why I Built This
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__mobile__buttons">
            <button
              className="header__mobile__login__button"
              onClick={() => onButtonClick(formModal[0])}
            >
              Log In
            </button>
            <button
              className="header__mobile__signup__button"
              onClick={() => onButtonClick(formModal[1])}
            >
              Sign Up
            </button>
          </div>
            </div>

          ):(null)}
        </div>
      )}
    </div>
  );
}

export default Header;
