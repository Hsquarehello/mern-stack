import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { AuthContext } from "../contexts/AuthContext";

const SignUpForm = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { dispatch } = useContext(AuthContext);

  //  * A function that handles the registration process.
  //  *
  //  * @param {Event} e - The event object triggering the registration.
  //  * @return {Promise} A promise representing the result of the registration process.
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      let data = {
        name,
        email,
        password,
      };
      let res = await axios.post("/api/users/sign-up", data);
      if (res) {
        setLoading(false);
      }
      if (res.status == 200) {
        dispatch({ type: "LOGIN", payload: res.data.user });
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      setErrors(e.response.data.errors);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={register}>
        <h1 className=" text-2xl text-center mb-3 font-semibold">
          Sign up form.
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username">
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors ? (errors.name ? "border-red-600" : "") : ""
            }`}
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors && errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.msg}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Emial
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors ? (errors.email ? "border-red-500" : "") : ""
            }`}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors && errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email.msg}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors ? (errors.password ? "border-red-500" : "") : ""
            }`}
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors && errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.msg}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "cursor-wait" : "cursor-pointer"
            }`}
            type="submit"
            disabled={loading ? true : false}>
            Sign Up
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-800"
            to="/sign-in">
            Login here!
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default SignUpForm;
