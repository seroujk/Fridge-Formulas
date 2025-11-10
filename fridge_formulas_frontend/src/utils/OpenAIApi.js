import { checkResponse } from "./api";
import { APIkey } from "./constants";

export function getRecipeInfo(userInput) {
  return fetch(`https://corsproxy.io/?https://api.openai.com/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIkey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI sous chef that creates a 4 day meal plan in JSON format.
          Respond ONLY with a valid JSON array like this:
          [
            { "recipeDiet:" {Depending on the user input's choice beterrn Carnivor, Vegan,Omnivor, or Pescatarian}
              "recipeTitle": "Spaghetti Bolognese (a maxmimum of 2 words)",
              "recipeIcon: "🍝 (A single icon only)",
              "recipeInstructions": [
                "⏱️ Cooking time : 20 minutes"
                "Boil pasta until tender",
                "Cook beef with sauce",
                "Mix and serve hot"
              ]
            }
          ]`,
        },
        {
          role: "user",
          content: ` My dietary preference is: ${userInput[0]}
                     My fridge contains: ${userInput[1].join(", ")}`,
        },
      ],
    }),
  }).then(checkResponse);
}
