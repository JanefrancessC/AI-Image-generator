import mongoose from "mongoose";

const connectDB = (url) => {
  // to be used by the search function
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error(err));
};

export default connectDB;