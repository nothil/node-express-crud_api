import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

// const CONNECTION_URL = 'mongodb+srv://nothile:nothile123@cluster0.gz8ndj7.mongodb.net/?retryWrites=true&w=majority';
const CONNECTION_URL =
  "mongodb+srv://nothile:nothile123@cluster0.j8dhnri.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Homepage.");
});
