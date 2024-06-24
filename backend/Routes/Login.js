// import express from "express";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import { genrateToken } from "../middleware/Authmiddle.js";
// import jwt from "jsonwebtoken";
// import cookie from "cookie-parser";

// const router = express.Router();

// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("Please enter a valid email address"),
//     body("password")
//       .isLength({ min: 5 })
//       .withMessage("Password must be at least 5 characters long"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email;
//     try {
//       let userData = await User.findOne({ email });

//       if (!userData) {
//         return res.status(400).json({ error: "email is not valid" });
//       }
//       if (req.body.password !== userData.password) {
//         return res.status(400).json({ error: "incorrect Password" });
//       } else {
//         console.log("User Login Sucessfully", userData);
//         const user = {
//           id: userData._id,
//           name: userData.username,
//           email: userData.email,
//         };
//         const token = genrateToken(user);
        
//         console.log("token :", token);
//         return res
//           .status(200)
//           .json({ success: true, user: userData, token: token });
//       }
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   }
// );

// router.get("/login", async (req, res) => {
//   try {
//     const allUsers = await User.find();
//     res.status(200).json(allUsers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;








import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genrateToken } from "../middleware/Authmiddle.js";



const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "email is not valid" });
      }
      const secpass = bcrypt.compare(req.body.password, userData.password);
      if (! secpass) {
        return res.status(400).json({ error: "incorrect Password" });
      } else {
        console.log("Logine",userData)
        const user = {
          name : userData.username,
          email : userData.email,
          
        }
        const token = await genrateToken(user);
        
        return res
          .status(200)
          .json({ success: true, user: userData, token: token });
      }

    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/login", async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;