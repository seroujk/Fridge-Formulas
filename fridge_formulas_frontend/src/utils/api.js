const BASE_URL = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

//Register a new user a.k.a create new user
function createUser({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

//Login a regsitered user
function loginUser({ email, password }) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse); //returns token
}

//Get current user
function getUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

//Edit user profile
function editUser(token, { name, avatar }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

//Generate meal plans
function generateMeals(userInput) {
  return fetch(`${BASE_URL}/mealplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  }).then(checkResponse);
}

// Save meal plans
function saveMeals(token, meals) {
  return fetch(`${BASE_URL}/users/me/mealplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({meals}),
  }).then(checkResponse);
}

//Get meal plans
function getMeals(token) {
  return fetch(`${BASE_URL}/users/me/mealplans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

//Delete a meal
function deleteMeal(mealId, token) {
  return fetch(`${BASE_URL}/users/me/mealplans/${mealId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  checkResponse,
  createUser,
  loginUser,
  getUser,
  editUser,
  generateMeals,
  getMeals,
  saveMeals,
  deleteMeal,
};
