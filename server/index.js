import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import session from "express-session"
import MongoStore from "connect-mongo";
import { authRouter } from "./routes/authRouter.js";
import { taskRouter } from "./routes/taskRoute.js";
import dotenv from "dotenv"
dotenv.config({ path: "./config.env"})

const app = express()

//DATABASE CONNECTION

const DB = process.env.DATABASE_STRING.replace(
  "password",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
    console.log("Database Connection was successfull! \n")
}).catch((error) => {
    console.log(`${error} happened while attempting to connect to database`)
})

//MIDDLEWARE STACK
app.use(express.json())
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
app.use("/task" , taskRouter);

//ROUTES
app.get("/" , (req,res) => {
    res.send("<h1>Hello to our Server</h1>")
    console.log("landing page of our api \n")
})

app.get("/initialize-session" , (req,res) => {

    console.log("req recieved " , req.session )

    req.session.sessionInit = true;
    
    res.status(200).json({message: "session initialization successfull"})
})


const PORT = 6028

app.listen( PORT , () => {
    console.log(`server is listening on ${PORT} right now \n`)
})