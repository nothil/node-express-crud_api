import express from "express";
import PostMessage from "../models/postMessage.js";
import SignUp from "../models/signUp.js";
import bcrypt from "bcrypt";

const router = express.Router();

let users = [];

// Get user Details

router.get("/", (req, res) => {
  try {
    PostMessage.find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Failed to retrieve the Course List: " + err);
      }
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// Create User new

router.post("/", async (req, res) => {
  const post = req.body;
  const user = new PostMessage(post);
  try {
    await user.save();
    res.status(201).json(user);

    console.log(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// /users/2 => req.params { id: 2 }
router.get("/:id", (req, res) => {
  try {
    PostMessage.findOne({ _id: req.params.id }, function (err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Failed to retrieve the Course List: " + err);
      }
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const post = req.body;
  try {
    PostMessage.deleteOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(
          `User with the id ${req.params.id} deleted from the database`
        );
      }
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.patch("/:id", (req, res) => {
  const post = req.params.id;
  console.log(req.body);

  try {
    PostMessage.findByIdAndUpdate(
      { _id: req.params },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },

      function (err, _docs) {
        if (err) {
          res.send(err);
        } else {
          console.log(
            `User with the id ${req.params.id} deleted from the database`
          );
        }
      }
    );
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const register = new SignUp({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      register
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint

router.post("/login", (request, response) => {
  // check if email exists
  SignUp.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

export default router;
