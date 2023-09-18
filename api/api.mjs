import express from "express";
import cors from "cors";
import helloworld from "./routes/helloworld.mjs";
import users from "./routes/users.mjs";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/helloworld", helloworld);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server is up on localhost:${PORT}`);
}); 
