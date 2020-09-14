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
  const APP_ID = "758939af";
  const APP_KEY = "adf50208712e80852d0a59199baf50cd";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana')

  
  //const [counter, setCounter] = useState(0);
  //const [c2, setCounter2] = useState(0);

  // useEffect(() => {
  //   console.log("Effect has been run.");
  // }, [counter]); // just run when the counter changes

  useEffect(() => {
    console.log(search);
    getRecipies();
  }, [query]);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    // fetch(exampleRequest)
    // .then(response => {
    //   response.json();
    // })
    // .then(data => console.log(data));
    console.log(query)
    console.log(data.hits);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      //console.log(search);
  };

  const getSearch = (e : React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //console.log(search + "search");
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
        {/* <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
  <h1 onClick={() => setCounter2(c2 + 1)}>{c2}</h1> */}
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
