import React from "react";

/**
 * Renders a list of ingredients as a set of blue-colored, rounded-cornered,
 * white-text, clickable spans.
 *
 * @param {object} props - The component props.
 * @param {Array} props.ingredients - An array of ingredients to be rendered.
 * @return {JSX.Element} A div containing a span with the text "Ingredients -"
 * followed by a set of spans for each ingredient.
 */
export default function Ingredients({ ingredients }) {
  return (
    <div className=" space-x-1">
      <span className=" space-x-1">
        Ingredients -{" "}
        {!!ingredients.length &&
          ingredients.map((ingredient, i) => (
            <span
              className=" my-1 bg-blue-500 rounded-md text-white p-1 cursor-pointer inline-flex flex-wrap justify-end"
              key={i}>
              {ingredient}
            </span>
          ))}
      </span>
    </div>
  );
}
