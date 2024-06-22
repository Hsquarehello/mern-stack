import React, { useEffect, useState } from "react";
import Ingredients from "../components/Ingredients";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeCreateForm() {
  let { id } = useParams();
  let [ingredients, setIngredients] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newIngredients, setNewIngredients] = useState("");
  let [errors, setErrors] = useState([]);
  let [loading,setLoading] = useState(false)
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        let res = await axios.get("/api/recipes/" + id);
        if (res.status == 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo)
        }
      }
    };
    fetchData();
  }, [id]);

  const addRecipe = () => {
    if (newIngredients) {
      setIngredients((prev) => [...prev, newIngredients]);
      setNewIngredients("");
    }
  };

  const submitRecipe = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let recipe = {
        title,
        description,
        ingredients,
      };

      let res;
      if (id) {
        res = await axios.patch("/api/recipes/" + id, recipe);
      } else {
        res = await axios.post("/api/recipes", recipe);
      }

      let formData = new FormData;
      formData.set('photo', file)

      let uploadRes = await axios.post(`/api/recipes/${res.data._id}/upload`, formData,{
        headers: {
          Accept: "multipart/form-data",
        }
      })
      console.log(uploadRes)

      if (res.status == 200) {
        setLoading(false)
        navigate("/");
      }
    } catch (e) {
      setLoading(false)
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  const upload = (e) => {
    let file = e.target.files[0];
    setFile(file);

    // preview
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <form
        className=" mx-auto max-w-md bg-gray-200 space-y-4 md:w-[80%] p-10 rounded-sm w-full"
        action=""
        onSubmit={submitRecipe}>
        {/* Form Title */}
        <h1 className="text-center text-2xl font-semibold">
          Recipe Create Form
        </h1>

        {/* Error Message */}
        <ul className=" text-center">
          {!!errors.length &&
            errors.map((err, i) => {
              return (
                <li key={i} className=" text-red-500">
                  {err} is invalid value.
                </li>
              );
            })}
        </ul>
        {/* file upload */}
        <input type="file" onChange={upload} />
        {preview && <img src={preview} alt="" />}

        {/* Title */}
        <div className=" space-y-2">
          <label htmlFor="title" className="font-semibold text-[16px]">
            Title
          </label>
          <div className="bg-gray-100 py-3 px-5 rounded border border-gray-300">
            <input
              id="title"
              value={title}
              type="text"
              name="title"
              className="w-full bg-gray-100 leading-[21px] border-none outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="font-semibold text-[16px]">
            Description
          </label>
          <textarea
            className="w-full bg-gray-100 h-[150px] border border-gray-300 rounded-sm indent-6 outline-none p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        {/* Ingredients */}
        <Ingredients ingredients={ingredients} />

        {/* Add Ingredient */}
        <div className="flex gap-1 w-full items-center">
          <div className="bg-gray-100 py-3 px-5 rounded border border-gray-300">
            <input
              value={newIngredients}
              type="text"
              name="title"
              className="w-full bg-gray-100 leading-[21px] border-none outline-none"
              onChange={(e) => {
                setNewIngredients(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="button"
              className=" bg-gray-800 py-3 px-4 text-white rounded"
              onClick={addRecipe}>
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-gray-800 py-3 px-4 text-white rounded w-full ${loading ? 'cursor-wait': 'cursor-pointer'}`}>
          {id? "Update Recipe": "Create Recipe"}
        </button>
      </form>
    </div>
  );
}
