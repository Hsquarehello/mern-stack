import { Link } from "react-router-dom";
import Ingredients from "./Ingredients";
import axios from "../helpers/axios";

const RecipeCard = ({ recipe, onDelete }) => {
  const deleteRecipe = async () => {
    const res = await axios.delete(
      "/api/recipes/" + recipe._id,
      recipe
    );
    if (res.status == 200) {
      onDelete(recipe._id);
    }
  };
  return (
    <div className=" bg-white p-4 rounded-lg space-y-2" key={recipe._id}>
      {recipe.photo && <div className="w-full h-[240px] sm:w-full md:h-[220px] lg:h-[180px] max-w-[350px] mx-auto overflow-hidden rounded-lg"><img className=" mx-auto h-[100%] w-[100%]" src={import.meta.env.VITE_BACKEND_URL + recipe.photo} alt="" /></div>}
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-blue-500">{recipe.title}</h1>
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
      <h2 className=" text-base font-medium">Description</h2>
      <p className="text-sm text-gray-500">{recipe.description}</p>

      <Ingredients ingredients={recipe.ingredients} />

      <div className="text-sm text-gray-500">
        <span className="font-semibold">Published - </span>
        <span className="text-blue-900 font-semibold">{recipe.createdAt}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
