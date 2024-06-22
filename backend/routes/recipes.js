const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/RecipeController");
const { body } = require("express-validator");
const handleErrMsg = require("../middlewares/handleErrMsg");
const AuthMiddleware = require("../middlewares/authMiddleware");
const upload = require("../helper/upload");

router.get("", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("/:id/upload", [
  upload.single("photo"),
  body('photo').custom((value,{req}) => {
    if(!req.file){
      throw new Error('Photo is required.')
    }
    if(!req.file.mimetype.startsWith('image')){
      throw new Error('Please upload an image')
    }
    return true
  })
],handleErrMsg, RecipeController.upload);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 2 }),
  ],
  handleErrMsg,
  RecipeController.store
);
router.delete("/:id", RecipeController.destory);
router.patch("/:id", RecipeController.update);

module.exports = router;
