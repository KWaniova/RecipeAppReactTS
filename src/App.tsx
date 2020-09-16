import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

type RecipeType = {
  recipe: {
    image: string;
    label: string;
    calories: number;
    ingredients: {
      text: string,
  }[] 
 };
};

function App() {
  const APP_ID = "abc"; 
  const APP_KEY = "abc"; //add API id

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana')

  useEffect(() => {
    console.log(search);
    getRecipies();
  }, [query]);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(query)
    console.log(data.hits);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
  };

  const getSearch = (e : React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button onClick={getSearch} className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map((recipee: RecipeType) => (
        <Recipe
          key={recipee.recipe.label}
          title={recipee.recipe.label}
          image={recipee.recipe.image}
          calories={recipee.recipe.calories}
          ingredients={recipee.recipe.ingredients}
        />
      ))}
      </div>
     
    </div>
  );
}

export default App;
