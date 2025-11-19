import "./App.css";
import React, { Children } from "react";
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Carousel from "./components/Carousel/Carousel";
import CardsSection from "./components/CardsSection/CardsSection";
import Footer from "./components/Footer/Footer";
import FridgeModal from "./components/FridgeModal/FridgeModal";
import LoginModal from "./components/LoginModal/LoginModal";
import RecipesModal from "./components/RecipesModal/RecipesModal";
import { getRecipeInfo } from "./utils/OpenAIApi";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import WhyBuildthis from "./components/WhyBuildThis/WhyBuildThis";

function App() {
  const [formModal, setFormModal] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [recipes, setRecipes] = useState(null);

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

  return (
    <>
      <Header
        onButtonClick={handleFormOpen}
        formModal={["login-modal", "signup-modal"]}
      />
      <Route exact path="/">
        <HeroSection
          onButtonClick={handleFormOpen}
          formModal={"fridge-modal"}
        />
        <Carousel />
      </Route>
      <Route exact path="/">
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
      </Route>

      <Route exact path="/why-build-it">
        <WhyBuildthis />
      </Route>

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
        formToOpen="recipes-modal"
      />

      <LoginModal
        isOpen={formModal === "login-modal"}
        onClose={handlFormClose}
        buttonText1="Login"
        buttonText2="or Sign up"
      />
      <SignUpModal
        isOpen={formModal === "signup-modal"}
        onClose={handlFormClose}
        buttonText1="Sign Up"
        buttonText2="or Login"
      />

      <RecipesModal
        isOpen={formModal === "recipes-modal"}
        recipes={recipes}
        onClose={handlFormClose}
        buttonText1="SaveRecipes"
        buttonText2="Generate New Meals"
        formTitle="Your Meal Plan"
      />
      <Footer />
    </>
  );
}

export default App;
