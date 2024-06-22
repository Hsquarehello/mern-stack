import React from "react";
import Ingredients from "./Ingredients";
import { Link } from "react-router-dom";
import axios from "../helpers/axios";

export default function Rcard({ recipe, onDelete }) {
  const deleteRecipe = async () => {
    const res = await axios.delete("/api/recipes/" + recipe._id, recipe);
    if (res.status == 200) {
      onDelete(recipe._id);
    }
  };
  return (
    <div class="w-full h-full max-w-[400px] mx-auto bg-neutral-800 text-neutral-300 p-4 flex flex-col items-start justify-center gap-7 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow rounded-xl">
      {recipe.photo && (
        <div class="w-full h-48 bg-sky-300 overflow-hidden rounded-2xl">
          <img
            className=" mx-auto h-[100%] w-[100%]"
            src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
            alt=""
          />
        </div>
      )}
      <div className=" w-full grid gap-3">
        <div className="flex justify-between w-full">
          <p class="font-extrabold capitalize">{recipe.title}</p>
          <div className=" space-x-1">
            <Link
              to={`recipe/edit/${recipe._id}`}
              className=" bg-green-500 text-white px-2 py-1 text-sm rounded-md font-medium">
              Edit
            </Link>
            <button
              className=" bg-red-500 text-white px-2 py-1 text-sm rounded-md font-medium"
              onClick={deleteRecipe}>
              Delete
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold">Description</h1>
          <p class=" capitalize">{recipe.description}</p>
        </div>

        {/* <Ingredients ingredients={recipe.ingredients} /> */}
      </div>
      <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
        See more
      </button>
      <p class="text-sm text-gray-500">Published - {recipe.createdAt}</p>
    </div>
  );
}
