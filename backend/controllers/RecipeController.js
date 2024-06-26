const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe");
const removeFile = require("../helper/removeFile");
const User = require("../models/User");
const emailQueue =  require('../Queue/emailQueue')

const RecipeController = {
  /**
   * Retrieves a paginated list of recipes from the database, along with pagination links.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<Object>} The response object containing the paginated list of recipes and pagination links.
   */
  index: async (req, res) => {
    const limit = 6;
    let page = req.query.page || 1;
    let recipes = await Recipe.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    let totalRecipesCount = await Recipe.countDocuments();
    let totalPagesCount = Math.ceil(totalRecipesCount / limit);
    let links = {
      prevPage: page == 1 ? false : true,
      nextPage: page == totalPagesCount ? false : true,
      current: page,
      loopAbleLinks: [],
    };
    for (let index = 0; index < totalPagesCount; index++) {
      let number = index + 1;
      links.loopAbleLinks.push({ number });
    }
    let response = {
      data: recipes,
      links,
    };
    return res.json(response);
  },
  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: "invalid id" });
      }
      let recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ err: "recipe not found" });
      }
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ err: "internet error" });
    }
  },
  store: async (req, res) => {
    let { title, description, ingredients } = req.body;
    let recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    console.log(req.user.name)
    let users = await User.find(null, ["email"]);
    let emails = users.map((user) => user.email);
    emails = emails.filter((email) => email !== req.user.email);
    // Add a job to the email queue
    emailQueue.add({
      viewFile: "email",
      data: {
        name: req.user.name,
        newRecipe: recipe.title,
      },
      from: req.user.email,
      to: emails,
      subject: "new recipe",
    });
    return res.json(recipe);
  },
  destory: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: "invalid id" });
      }
      let recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ err: "recipe not found" });
      }
      // delete file
      await removeFile(__dirname + "/../public" + recipe.photo);
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ err: "internet error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;

      // throw err if id is invalid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: "invalid id" });
      }

      // update recipe
      let recipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });

      // delete photo if it exists
      await removeFile(__dirname + "/../public" + recipe.photo);

      // throw err if recipe not found
      if (!recipe) {
        return res.status(404).json({ err: "recipe not found" });
      }

      // return updated recipe
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ err: "internet error" });
    }
  },
  upload: async (req, res) => {
    try {
      let id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: "invalid id" });
      }

      let recipe = await Recipe.findByIdAndUpdate(id, {
        photo: "/" + req.file.filename,
      });

      if (!recipe) {
        return res.status(404).json({ err: "recipe not found" });
      }

      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ err: "internet error" });
    }
  },
};

module.exports = RecipeController;
