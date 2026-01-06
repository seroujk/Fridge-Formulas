import "./Header.css";
import fridgeIcon from "../../assets/fridge-icon.svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AvatarPlaceholder from "../AvatarPlaceHolder/AvatarPlaceHolder";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Header({ onButtonClick, formModal, isLoggedIn, onLogout }) {
  const [isHamburger, setIsHamburger] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
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
                <button
                  className="header__call-to-action"
                  onClick={() => onButtonClick(formModal[2])}
                >
                  Generate Meal Plans
                </button>
              </li>
            </ul>
          </nav>
          {/*CHECK IF USER IS LOGGED IN TO SHOW DIFFERENT BUTTONS  */}
          {!isLoggedIn ? (
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
          ) : (
            <div className="header__loggedin-buttons">
              <button className="header__my-recipes-button">    <Link to="/my-meal-plans">My Meal Plans</Link></button>
              <button
                className="header__edit-profile-button"
                onClick={() => onButtonClick(formModal[3])}
              >
                Edit Profile
              </button>
              <button
                onClick={() => onLogout()}
                className="header__logout-button"
              >
                Log Out
              </button>
              <div className="header__user-info">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar image"
                    className="header__avatar-image"
                  />
                ) : (
                  <AvatarPlaceholder username={currentUser.name} />
                )}
                <p>{currentUser.name}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="header__mobile-menu">
          <div className="header__user-info">
         { isLoggedIn?  
           (<>
           <p>{currentUser ? currentUser.username : null}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="avatar image"
                className="header__avatar-image"
              />
            ) : (
              <AvatarPlaceholder username={currentUser.username} />
            )}
            </>) 
            :
            (null)}
            <button
              className="header__mobile-menu-button"
              onClick={() => {
                setIsMobileOpen(!isMobileOpen);
              }}
            >
              ☰
            </button>
          </div>

          {isMobileOpen ? (
            <div className="header__mobile-menu-items">
              <nav className="header__navbar">
                <ul className="header__mobile__navabar_items">
                  <li>
                    <button
                      className="header__call-to-action"
                      onClick={() => {
                        setIsMobileOpen(false);
                        onButtonClick(formModal[2]);
                      }}
                    >
                      Generate Meals
                    </button>
                  </li>
                  <li>
                    <HashLink
                      to="/#how-it-works"
                      smooth="true"
                      duration={600}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      How It Works
                    </HashLink>
                  </li>
                  <li>
                    <HashLink
                      to="/#dietary-templates"
                      smooth="true"
                      duration={600}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Dietary Templates
                    </HashLink>
                  </li>
                </ul>
              </nav>
              {!isLoggedIn ? (
                <div className="header__mobile__buttons">
                  <button
                    className="header__mobile__login__button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      onButtonClick(formModal[0]);
                    }}
                  >
                    Log In
                  </button>
                  <button
                    className="header__mobile__signup__button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      onButtonClick(formModal[1]);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="header__loggedin-buttons">
                  <Link to="/my-meal-plans">My Meal Plans</Link>
                  <button
                    className="header__edit-profile-button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      onButtonClick(formModal[3]);
                    }}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileOpen(false);
                     
                    }}
                    className="header__logout-button"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Header;
