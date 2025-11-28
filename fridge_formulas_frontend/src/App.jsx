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
import { getRecipeInfo } from "./utils/OpenAIApi";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [pendingRecipes, setPendingRecipes] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isValidUser, setIsValidUser] = useState(true);

  // Use this code for a reset users and recipes
  //localStorage.removeItem("userList");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInput) {
      getRecipeInfo(userInput)
        .then((res) => {
          const content = res.choices?.[0].message?.content;
          setRecipes(JSON.parse(content));
        })
        .catch((err) => console.error("API Error:", err));
    }
  }, [userInput]);

  useEffect(() => {
    const userlist = JSON.parse(localStorage.getItem("userList"));
    const token = JSON.parse(localStorage.getItem("JWT"));
    if (token && userlist) {
      const userThatHasToken = userlist.find((u) => u.id === token.uniqueID);

      if (userThatHasToken) {
        setIsLoggedIn(true);
        setCurrentUser(userThatHasToken);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  const handleFormOpen = (formModal) => {
    setFormModal(formModal);
  };

  const handlFormClose = () => {
    setFormModal(null);
  };

  const handeFridgeSubmit = (items, diet, e) => {
    e.preventDefault();
    const fridgeItems = items
      .filter((item) => item.value.length > 0 && item.value != null)
      .map((item) => {
        return item.value;
      });
    setUserInput([diet, fridgeItems]);
  };

  const handleSaveRecipes = (newRecipes) => {
    const userList = JSON.parse(localStorage.getItem("userList"));
    const user = userList.find((u) => u.email === currentUser.email);
    if (user) {
      newRecipes.forEach((singleRecipe) => user.recipes.push(singleRecipe));
      localStorage.setItem("userList", JSON.stringify(userList));
      setCurrentUser(currentUser);
    }
  };

  const handleSavePendingRecipes = (user) => {
    const userList = JSON.parse(localStorage.getItem("userList"));
    if (user && pendingRecipes) {
      pendingRecipes.forEach((singleRecipe) => user.recipes.push(singleRecipe));
      //Find the user in the userlist and update it
      const index = userList.findIndex(u => u.id === user.id)
      userList[index] = user;
      localStorage.setItem("userList", JSON.stringify(userList));
      setCurrentUser(user);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    //generate unique ID for that user
    const userId = uuidv4();
    //generate an authentication token for the user
    const tokenData = {
      uniqueID: userId,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours from now
    };
    // convert token data to string and store
    const token = JSON.stringify(tokenData);
    localStorage.setItem("JWT", token);
    //create a user object and add the unique ID to it
    const user = {
      id: userId,
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      recipes: [],
    };

    //set current user as the newly signed up user
    setCurrentUser(user);
    //Retrieve the user list from local storage or if there isn't one initialize it
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    const newUser = user;
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    setIsLoggedIn(true);
    handleSavePendingRecipes(user);
    setPendingRecipes(null);
    navigate("/my-meal-plans");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    //Retrieve user list from local storage
    const userList = JSON.parse(localStorage.getItem("userList"));
    //if user list exists
    if (userList) {
      const user = userList.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        //generate an authentication token for the user
        const tokenData = {
          uniqueID: user.id,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours from now
        };
        // convert token data to string and store
        const token = JSON.stringify(tokenData);
        localStorage.setItem("JWT", token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsValidUser(true);
        setUsername(user.username);
        setAvatar(user.avatar);
        handlFormClose("login-modal");
        handleSavePendingRecipes(user);
        setPendingRecipes(null);
        navigate("/my-meal-plans");
      } else {
        setIsValidUser(false);
        console.error("Invalid username or password");
      }
    } else {
      setIsValidUser(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleProfileEdit = (e) => {
    e.preventDefault();
    //Retrieve user list from local storage
    const userList = JSON.parse(localStorage.getItem("userList"));
    const user = userList.find(
      (u) => u.email === email && u.password === password
    );

    user.username = username;
    user.avatar = avatar;

    localStorage.setItem("userList", JSON.stringify(userList));
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
        onSubmit={handeFridgeSubmit}
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
        recipes={recipes}
        onClose={handlFormClose}
        buttonText1="SaveRecipes"
        buttonText2="Generate New Meals"
        formTitle="Your Meal Plan"
        isLoggedIn={isLoggedIn}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
        onButtonClick={handleSaveRecipes}
        onNotLoggedIn={handleFormOpen}
        formModal="login-modal"
        setPendingRecipes={setPendingRecipes}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
