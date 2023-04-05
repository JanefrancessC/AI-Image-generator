import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);



app.get("/", async (req, res) => {
  res.send("Welcome to AI image generator!");
});

const startServer = async (req, res) => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startServer();

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
