import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { authRouter } from "./routes/authRouter.js";
import { taskRouter } from "./routes/taskRoute.js";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Task } from "./models/Task.js";
dotenv.config({ path: "./config.env" });

const app = express();

//DATABASE CONNECTION

const DB = process.env.DATABASE_STRING.replace(
  "password",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection was successfull! \n");
  })
  .catch((error) => {
    console.log(`${error} happened while attempting to connect to database`);
  });

//MIDDLEWARE STACK
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    "Access-Control-Allow-Credentials": true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // Ensure this is set to false
    saveUninitialized: true, // Ensure this is set to true
    store: MongoStore.create({
      mongoUrl: DB,
      collection: "sessions",
      ttl: 7 * 24 * 60 * 60, // Adjust expiration time as needed
      cookie: { secure: false }, // Adjust based on environment
    }),
    cookie: {
      path: "/",
      secure: false, // Adjust based on environment
    },
  })
);
app.use("/auth", authRouter);
app.use("/task", taskRouter);

//ROUTES
app.get("/", (req, res) => {
  res.send("<h1>Hello to our Server</h1>");
  console.log("landing page of our api \n");
});

app.get("/initialize-session", (req, res) => {
  console.log("req recieved ", req.session);

  req.session.sessionInit = true;

  res.status(200).json({ message: "session initialization successfull" });
});

Task.watch().on("change", (data) =>
  console.log(data.fullDocument, "database has been updated/new data added\n")
  //data.fullDocument returns the whole document , when a change happens new entry/updation
  // i can access times and days and iterate through them and do the necessary transformations and schedule event to send an email/sms 
  
);

const PORT = 6028;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} right now \n`);
});
