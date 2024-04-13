import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { checkAuthentication } from "../middlewares/checkAuthentication.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("req recieved to register endpoint ", req.body);
  const { username, password, role , email } = req.body;

  console.log(
    `${username} --- username ${password} --- password ${role} --- role \n`
  );

  /*
        check if the username or password already exists , if both doenst exist register 
    */

  try {
    //const createdUser = await User.create({ username, password });

    const user = await User.findOne({ username: username });

    if (user) {
      console.log(" if user exists in database -- ", user, "\n");
      res.status(409).json({ message: "user already exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            console.log(` ${err} error happened while hashing the password \n`);
            res.status(404).json({ message: "error happened" });
            return;
          }

          try {
            const newUser = await User.create({
              username: username.trim(),
              password: hash,
              role: role,
              email: email
            }).then((result) => {
              console.log(result, "this is the result");
              res.status(200).json({
                message: "User created successfully!",
              });
            });

            console.log("password hashed and stored successfully!");
          } catch (error) {
            console.log(
              `error happened while creating the user post hashing  \n`
            );
            res.status(404).json({ message: "error happened" });
          }
        });
      });
    }
  } catch (error) {
    console.log(
      `error encountered while attempting to register --- ${error} \n`
    );
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username: username });

  let isAuthenticated = false

  if (userExists) {
    const user = await User.findOne({ username: username, password: password });

    const isPasswordValid = await bcrypt.compare(
      password,
      userExists.password,
      (err, result) => {
        if (err) {
          console.log(err, ` some error \n`);
        } else {
          if (result) {
            console.log(`yeah passwords match --- \n`);
            req.session.isAuthenticated = true
            req.session.user = userExists.username,
            req.session.role = userExists.role,
            res.status(200).json({ message: "user logged in", user: { username: userExists.username , role: userExists.role , isAuthenticated: true , email: userExists.email } });
           
          } else {
            console.log(`passwords do not match --- \n`);
            res.status(401).json({ message: "incorrect password" });
          }
        }
      }
    );
   
  } else {
    
    res.status(401).json({ message: "user does not exist" });
  }
});

router.post("/auth-status" , async (req,res) => {

    const { username } = req.body;

    console.log(`${username} ${JSON.stringify(req.session)} --- username and session at auth-status endpoint `);

    if ( req.session.isAuthenticated && username ) {

        console.log("authenticated user");

        const currentUser = await User.findOne({ username: username})

        res.status(200).json({ username: currentUser.username , role: currentUser.role , isAuthenticated: true })

    }

    checkAuthentication(req.session) ? console.log("authenticated") : console.log("unauthenticated");

});


router.get("/dummy-route" , (req,res) => {

  console.log(
    `req recieved to dummy-route endpoint ${JSON.stringify(
      req.session
    )} --this is what session looks like here`
  );

  
    checkAuthentication(req.session)
      ? console.log("authenticated in /dummy-route")
      : console.log("unauthenticated in /dummy-route");


})


router.post("/kill-auth" , (req,res) => {

  console.log(`req recieved to kill-auth endpoint ${JSON.stringify(req.session)} --this is what session looks like here`)

  if (req.session.isAuthenticated) {

    req.session.isAuthenticated == false
    req.session.user = "";
    req.session.role = "";
    req.session.destroy()

    res.status(200).json({ message: "Logged Out"});

  }
})

export { router as authRouter };
