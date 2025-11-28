# 🥩Fridge Formulas

## 1. Project Overview

**FridgeFormulas** is a web application built with the **MERN stack** that helps people with minimal cooking skills and limited time create affordable, home-cooked meal plans.  
The app leverages **OpenAI’s API** to recommend meals based on the user’s fridge inventory and calculates how much money they save by cooking at home instead of eating out.

---

## 2. Problem Statement

Many people:

- Don’t know what to cook with the items already in their fridge.  
- Rely on take-out or restaurant meals, which cost more and often lead to food waste.  
- Feel overwhelmed by meal-planning and recipe hunting.

**FridgeFormulas** addresses all three challenges by:
- Automating meal planning  
- Reducing food waste

---

## 3. Key Features

### 🧍‍♂️ User Profiles & Dietary Templates
- Users log in and choose a dietary template: *Carnivore*, *Vegetarian*, *Omnivore*, etc.

### 🧊 Fridge Inventory Input
- Users describe the items currently in their fridge (e.g., “chicken breast, spinach, eggs, cheddar”).

### 🤖 AI-Generated Meal Plans
- The app generates up to **4 meal cards** with:
  - Complete recipes  
  - Step-by-step cooking instructions  
  - Ingredients pulled from the user’s fridge  

### ⭐ Save Favorite Meals
- Users can bookmark recipes they love for future use.

### 🔁 Fridge Refresh
- A one-click button clears the current fridge inventory for new entries and fresh recommendations.

### 💾 Data Persistence
- All user data, saved recipes, and fridge contents are securely stored in **MongoDB**.

---

## 4. Technology Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Single Page Application, responsive minimal design) |
| **Backend** | Node.js with Express (REST API) |
| **Database** | MongoDB (stores user profiles, fridge contents, and saved meals) |
| **AI Integration** | OpenAI API (meal recommendations & recipe generation) |
| **Hosting** | Google Cloud Platform with Nginx |
| **Authentication** | JWT-based secure login and session handling |

---

## 5. User Flow

1. **Sign Up / Login** → User selects a dietary preference template.  (In Progress)
2. **Enter Fridge Inventory** → Input available ingredients.  
3. **Generate Meal Plans** → Up to 4 AI-powered meal cards appear with recipes and steps.  
4. **Save Favorites** → Bookmark preferred meals for reuse.  (In Progress)
5. **No Sign Up Required** → Users can also generate meals plans without logging in


## 6. Diployed on GitHub Pages
1. **Deployment Link** : https://seroujk.github.io/Fridge-Formulas/

## 7. Triple Ten Evaluation

1. **API Key** → Please generate your own API key to test the app
2. **Current Version** → In the current version the login and sign up modals are designed but they are not implemented you can test out
the recipe generation using the API and the responsive design throughout the web app.
3. **Questions** → Please let me know if you have any questions regarding the flow of the app. Thank you!
