import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { AuthContext } from "../contexts/AuthContext";

const SignInForm = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let [err, setErr] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigator = useNavigate();
  let { dispatch } = useContext(AuthContext);
  const login = async (e) => {
    e.preventDefault();
    setError(null);
    setErr(null);
    setLoading(true);
    try {
      let data = {
        email,
        password,
      };
      let res = await axios.post("/api/users/login", data);
      if (res.status == 200) {
        setLoading(false);
        dispatch({ type: "LOGIN", payload: res.data.user });
        navigator("/");
      }
    } catch (e) {
      setLoading(false);
      console.log(e.response.data.err);
      setErr(e.response.data.err);
      setError(e.response.data.errors);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={login}>
        <h1 className=" text-2xl text-center mb-3 font-semibold">
          Sign In Form.
        </h1>
        {err && <p className=" text-red-500 text-xs italic">{err}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Emial
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? (error.email ? "border-red-500" : "") : ""
            }`}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && error.email && (
            <p className="text-red-500 text-xs italic">{error.email.msg}</p>
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
              error ? (error.email ? "border-red-500" : "") : ""
            }`}
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && error.password && (
            <p className="text-red-500 text-xs italic">{error.password.msg}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "cursor-wait" : "cursor-pointer"
            }`}
            type="submit"
            disabled={loading ? true : false}>
            Sign In
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-800"
            to="/sign-up">
            Register
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default SignInForm;
