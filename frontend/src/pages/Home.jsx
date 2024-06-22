import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipesCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import axios from "../helpers/axios";
import Rcard from "../components/Rcard";
import Loading from "./Loading";

const Home = () => {
  let navigate = useNavigate();
  let [recipes, setRecipes] = useState([]);
  let [links, setLinks] = useState(null);
  let [error, setError] = useState(null);
  let location = useLocation();
  let searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get("page"))
    ? parseInt(searchQuery.get("page"))
    : 1;

  const onDelete = (id) => {
    if (recipes.length == 1 && page > 1) {
      navigate(`/?page=` + (page - 1));
    }
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("/api/recipes?page=" + page);
        if (response.status === 200) {
          setError(null);
          let data = await response.data;
          setLinks(data.links);
          setRecipes(data.data);
        }
      } catch (e) {
        if (e.response.status == 401) {
          navigate("/sign-in");
        }
        setError(e.response.data.err);
      }
    };
    fetchData();
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
  }, [page]);

  if (!error) {
    return (
      <div className=" space-y-3 max-w-[1850px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
          <button className="bg-gray-700 rounded-md text-white p-2 hover:bg-gray-800 cursor-pointer">
            <Link to="/recipe/create">Add Recipe</Link>
          </button>
        </div>
        {!recipes.length && <Loading />}
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2 sm:grid-cols-1 md:grid-cols-2">
          {!!recipes.length &&
            recipes.map((recipe) => ( 
              // <RecipeCard
              //   recipe={recipe}
              //   key={recipe._id}
              //   recipes={recipes}
              //   onDelete={onDelete}
              // />
              <Rcard
                recipe={recipe}
                key={recipe._id}
                recipes={recipes}
                onDelete={onDelete}
              />
            ))}
        </div>
        {!!links && <Pagination links={links} page={page || 1} />}
      </div>
    );
  } else {
    return (
      <div className=" w-full h-[100vh] flex justify-center items-center flex-col g-[10px]">
        <h1 className=" text-4xl text-red-600 font-bold ">
          Token need to provide!
        </h1>
        <Link to="sign-in" className=" font-bold mt-4 text-2xl">
          Go Login
        </Link>
      </div>
    );
  }
};

export default Home;
