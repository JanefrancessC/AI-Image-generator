import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Welcome to AI image generator!");
});

// const startServer = async (req, res) => {
//   app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// };

// startServer();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
