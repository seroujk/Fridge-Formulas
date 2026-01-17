import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Carousel from "./components/Carousel/Carousel";
import CardsSection from "./components/CardsSection/CardsSection";
import Footer from "./components/Footer/Footer";
import FridgeModal from "./components/FridgeModal/FridgeModal";
import LoginModal from "./components/LoginModal/LoginModal";
import MealPlansModal from "./components/MealPlansModal/MealPlansModal";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import EditProfileModal from "./components/EditProfileModal/EditProfileModal";
import MyMealPlans from "./components/MyMealPlans/MyMealPlans";
import NoAccessMessage from "./components/NoAccessMessage/NoAccessMessage";
import {
  createUser,
  loginUser,
  getUser,
  editUser,
  generateMeals,
  saveMeals,
  deleteMeal,
} from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [meals, setMeals] = useState(null);
  const [hasUnsavedMeals, setHasUnsavedMeals] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isValidUser, setIsValidUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInput) {
      generateMeals(userInput)
        .then((mealResponse) => {
          setMeals(mealResponse.meals);
          setHasUnsavedMeals(true); // marking that the user has unsaved meals
        })
        .catch((err) => console.error("API Error:", err));
    }
  }, [userInput]);

  //Staying logged in after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setUsername(user.name);
        setAvatar(user.avatar);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const handleFormOpen = (formModal) => {
    setFormModal(formModal);
  };

  const handlFormClose = () => {
    setFormModal(null);
  };

  const handleFridgeSubmit = (items, diet, e) => {
    e.preventDefault();
    const fridgeItems = items
      .filter((item) => item.value.length > 0 && item.value != null)
      .map((item) => {
        return item.value;
      });
    setUserInput([diet, fridgeItems]);
  };

  const handleSaveUserMeals = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    saveMeals(token, meals)
      .then((res) => {
        console.log("Saved:", res);
        navigate("/my-meal-plans");
        handlFormClose();
      })
      .catch((err) => console.error("Save meals error:", err));
  };

  //Helper to save pending meals
  // we're passing token to this function instead of pulling token from local storage because this way:
  // 1. we have a single source of turth during auth
  // 2. Functions that depend on the global state of local storage are harder to reason about
  // 3. Future proofing (for example in the future we might move on to memory-based tokens)
  const savePendingMeals = (token) => {
    if (!hasUnsavedMeals || !meals?.length) {
      return Promise.resolve(null);
    }

    return saveMeals(token, meals)
      .then((res) => {
        setHasUnsavedMeals(false); //no longer pending
        return res;
      })
      .catch((err) => {
        console.error("Auto-save pending meals failed:", err);
        return null;
      });
  };

  const handleDeleteUserMeals = (mealId) => {
    const token = localStorage.getItem("token");
    deleteMeal(mealId, token)
      .then(() => {
        // remove the deleted meal from current user state so that the UI updated instantly
        // prev is our freshet current user without the deleted meal
          setCurrentUser((prev)=>{
            if(!prev) return prev;

            const nextMeals = (prev.meals || []).filter(
              (meal) => meal._id !== mealId
              )
            return {...prev,meals: nextMeals}
          })
      })
      .catch((err) => console.error(err));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUser({
      name: username,
      avatar,
      email,
      password,
    })
      .then(() => {
        return loginUser({ email, password });
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        return Promise.all([getUser(token), savePendingMeals(token)]);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsValidUser(true);
        //Set these to display in header
        setUsername(user.name);
        setAvatar(user.avatar);

        handlFormClose();
        navigate("/my-meal-plans");
      })
      .catch((err) => {
        console.error(`Sign up failed : ${err}`);
        setIsValidUser(false);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        return Promise.all([getUser(token), savePendingMeals(token)]);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsValidUser(true);
        setUsername(user.name);
        setAvatar(user.avatar);

        handlFormClose();
        navigate("/my-meal-plans");
      })
      .catch((err) => {
        console.error(`Login Error: ${err}`);
        setIsValidUser(false);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleProfileEdit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    editUser(token, { name: username, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handlFormClose();
      })
      .catch((err) => {
        console.log(`Error updating profile: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onButtonClick={handleFormOpen}
        formModal={[
          "login-modal",
          "signup-modal",
          "fridge-modal",
          "edit-profile-modal",
        ]}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogOut}
        username={username}
        avatar={avatar}
      />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <HeroSection
                onButtonClick={handleFormOpen}
                formModal={"fridge-modal"}
              />
              <Carousel />
              <div id="how-it-works">
                <CardsSection
                  sectionTitle="How It Works"
                  onButtonClick={handleFormOpen}
                  formModal="fridge-modal"
                  buttonText="Generate Meal Meals"
                />
              </div>
              <div id="dietary-templates">
                <CardsSection
                  sectionTitle="Dietary Templates"
                  onButtonClick={handleFormOpen}
                  formModal="fridge-modal"
                  buttonText="Generate Meal Meals"
                />
              </div>
            </>
          }
        />

        <Route
          exact
          path="/my-meal-plans"
          element={
            <>
              {isLoggedIn ? (
                <MyMealPlans
                  onButtonClick={handleFormOpen}
                  formModal={"fridge-modal"}
                  onDelete={handleDeleteUserMeals}
                />
              ) : (
                <NoAccessMessage
                  signUpModal="signup-modal"
                  loginModal="login-modal"
                  onButtonClick={handleFormOpen}
                />
              )}
            </>
          }
        />
      </Routes>

      <FridgeModal
        isOpen={formModal === "fridge-modal"}
        onClose={handlFormClose}
        onSubmit={handleFridgeSubmit}
        formTitle="Fridge Form"
        formSubtitle="Choose your diet and add your fridge items.
        Enter a minumum of 2 items"
        buttonText1="+ Add Item"
        buttonText2="Delete Item"
        buttonText3="Generate Meal Plan"
        openForm={handleFormOpen}
        formToOpen="meal-plans-modal"
      />
      <LoginModal
        isOpen={formModal === "login-modal"}
        onClose={handlFormClose}
        buttonText1="Login"
        buttonText2="or Sign up"
        onButtonClick={handleLogin}
        onOpen={handleFormOpen}
        setEmail={setEmail}
        setPassword={setPassword}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
      />
      <SignUpModal
        isOpen={formModal === "signup-modal"}
        onClose={handlFormClose}
        buttonText1="Sign Up"
        buttonText2="or Login"
        onButtonClick={handleSignUp}
        onOpen={handleFormOpen}
        setEmail={setEmail}
        setPassword={setPassword}
        setUsername={setUsername}
        setAvatar={setAvatar}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
      />
      <EditProfileModal
        isOpen={formModal === "edit-profile-modal"}
        onClose={handlFormClose}
        buttonText1="Complete"
        buttonText2="Discard"
        onButtonClick={handleProfileEdit}
        setUsername={setUsername}
        setAvatar={setAvatar}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
      />
      <MealPlansModal
        isOpen={formModal === "meal-plans-modal"}
        meals={meals}
        onClose={handlFormClose}
        buttonText1="Save Meals"
        buttonText2="Generate New Meals"
        formTitle="Your Meal Plan"
        isLoggedIn={isLoggedIn}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
        onButtonClick={handleSaveUserMeals}
        onNotLoggedIn={handleFormOpen}
        formModal="login-modal"
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
