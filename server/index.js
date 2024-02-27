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
import nodemailer from "nodemailer";
import schedule from "node-schedule";

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

Task.watch().on("change", async (data) => {
  console.log(data.fullDocument, "database has been updated/new data added\n");

  
  const times = data.fullDocument.times;
  const days = data.fullDocument.days;
  const receiver = await User.findOne({ _id: data.fullDocument.owner})
  const receiverEmail = receiver.email
  const medicineName = data.fullDocument.taskname
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  if (Array.isArray(times) && Array.isArray(days)) {
    
    for (const day of days) {
      console.log(day, "Current day"); 
      const dayIndex = days.indexOf(day);

      
      if (dayIndex !== -1) {
       
        console.log(`Day found at index: ${dayIndex}`);

        // times array looks like this ["10:04AM" , "10:08PM"]
        /*you will have to iterate and split and 
        create a new time array and then change it into railway 
        time for ex , "10:04PM" would be come 22 and 4*/

        for ( const time of times ) {

          let hour = 0;
          let minute = 0;
          if (time.slice(-2) != "PM") {
            hour = parseInt(time.slice(0, 2)); 
          } else {
            hour = parseInt(time.slice(0, 2)+12); 
          }

          minute = parseInt(time.slice(3,5));
          const today = new Date();
          const currentDate = today.getDate();
          const currentDay = daysOfWeek[today.getDay()];
          const currentMonth = months[today.getMonth()];
          const currentYear = today.getFullYear();
          
          

          if ( currentDay === day ) {

            const date = new Date(currentYear, currentMonth, currentDate, hour, minute, 0);

            const job = schedule.scheduleJob(date, function () {
              //this is where the mail is sent
              console.log("The world is going to end today."); // this function doesnt run just once is it expected behavioru or is it strange it does get fired at the right time
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "saradhsavyasaj@gmail.com",
                  pass: process.env.PASSWORD,
                },
              });
              const mailOptions = {
                from: "saradhsavyasaj@gmail.com",
                to: receiverEmail,
                subject: "Take Your Medicine",
                text: `Hello Sir/Mam , It is Time For You Take Your ${medicineName} `,
              };

              transporter
                .sendMail(mailOptions)
                .then((info) =>
                  console.log("Email sent successfully:", info.response)
                )
                .catch((error) => console.error("Error sending email:", error));
            });

          }
        
        }

        

        
      } else {
        console.log(`${day} not found in arrayOfDays`);
      }
    }
  } else {
    console.error("Error: times or days is not an array");
  }
});


const PORT = 6028;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} right now \n`);
});
