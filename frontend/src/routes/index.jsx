import React, { useContext } from 'react'
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import RecipeCreateForm from "../pages/RecipeCreateForm.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";
import SignInForm from "../pages/SignInForm.jsx";
import { createBrowserRouter, Navigate, RouterProvider   } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Index() {
   let {user} = useContext(AuthContext);

   const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element:<Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/recipe/create",
            element: user ? <RecipeCreateForm />: <Navigate to='/sign-in'/>,
          },
          {
            path: "recipe/edit/:id",
            element: user? <RecipeCreateForm />: <Navigate to='/sign-in'/>,
          },
          {
            path: 'sign-up',
            element: !user ? <SignUpForm/>:  <Navigate to='/'/>
          },
          {
            path: 'sign-in',
            element: !user ? <SignInForm/>:  <Navigate to='/'/>
          }
        ],
      },
    ]);

  return (
   <RouterProvider router={router} />
  )
}
