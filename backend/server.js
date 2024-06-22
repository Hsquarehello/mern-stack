const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/authMiddleware");
const cron = require("node-cron");
const sendEmail = require("./helper/sendEmail");
const mongoURL =
  "mongodb+srv://admin:admin@admin.o7pac0w.mongodb.net/?retryWrites=true&w=majority&appName=admin";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.set("views", "./views");
app.set("view engine", "ejs");

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Server is running at port:" + process.env.PORT);

      // cron.schedule("*/4 * * * * *", () => {
      //   console.log("running a task every 4 seconds");
      // });
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("email");
});

app.get("/send-email",async (req, res) => {
  try {
   let info =  await sendEmail({
      viewFile: "email",
      data: "new user",
      from: "wP5j6@example.com",
      to: "wP5j6@example.com",
      subject: "new user",
    });
    return res.json(info)
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", usersRoutes);

app.get("/set-cookie", (req, res) => {
  res.cookie("hey", "there");
  res.cookie("new", "hello", { httpOnly: true });
  return res.send("cookie already sent.");
});

app.get("/get-cookie", (req, res) => {
  let cookie = req.cookies;
  console.log(cookie);
  return res.json(cookie);
});
