import express from "express";
import { v4 as uuidv4 } from "uuid";
import PostMessage from "../models/postMessage.js";

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
  // console.log(users);
  // res.send(users);
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

export default router;
