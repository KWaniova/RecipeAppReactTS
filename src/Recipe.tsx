import React, {useState} from "react";
import style from "./recipe.module.css";

interface RecipeProps{
    title: string,
    image: string,
    calories: number
    ingredients: {
        text: string,
    }[]
};

const Recipe = (props: RecipeProps) => {
    return(
        <div className={style.recipe}>
            <h1>{props.title}</h1>
            <ol>
                {props.ingredients.map(ingredient => (<li>{ingredient.text}</li>))}
            </ol>
            <p>{props.calories}</p>
            <img className={style.image} src={props.image} alt=""/>
        </div>
    )
}

export default Recipe;