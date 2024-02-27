import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Task } from "../models/Task.js";
import { checkAuthentication } from "../middlewares/checkAuthentication.js";

const router = express.Router();

router.post("/add-task" , async (req,res) => {

    console.log(`req received to add-task endpoint \n`);

    if (checkAuthentication(req.session)) {

        console.log(`${JSON.stringify(req.body)} --- taskObject received `);

        let currentUser = await User.findOne({ username: req.session.user });

        const newTask = await Task.create({
          owner: currentUser._id,
            taskname: req.body.taskname,
            times: req.body.Times,
            days: req.body.Days
        }).then((result) => {
          console.log(result, "this is the result");
        

          res.status(200).json({
            message: "New Task created successfully!",
          });
        });

    } else {
        res.status(401).json({ message: "unauthenticated" })
    }

})

router.post("/delete-task" , (req,res) => {

    console.log(`req received to delete-task endpoint \n`);

    if (checkAuthentication(req.session)) {
    } else {
      res.status(401).json({ message: "unauthenticated" });
    }

})

router.post("/update-task" , (req,res) => {

    console.log(`req received to update-task endpoint \n`);

    if (checkAuthentication(req.session)) {
    } else {
      res.status(401).json({ message: "unauthenticated" });
    }

})

router.get("/getAllTasks" , async (req , res) => {

  console.log(`req hit /getAllTasks endpoint \n`)

   if (checkAuthentication(req.session)) {
    console.log("authenticated  /getAllTasks");
     let username = req.session.user;

     let currentUser = await User.findOne({ username : username})

     let allTasks = await Task.find({ owner: currentUser._id });

      res.status(200).json({
        message: "All Tasks fetched successfully!",
        tasks: allTasks
      });

    
   } else {
    console.log("unauthenticated /getAllTasks");
     res.status(401).json({ message: "unauthenticated" });
   }

})

export { router as taskRouter}
