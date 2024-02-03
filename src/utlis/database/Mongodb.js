import mongoose from "mongoose";
export async function connectDB() {
  //already connect
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/ams?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
