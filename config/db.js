import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.DB_URL;

export async function connectionDB() {
  try {
    await mongoose.connect(connectionString);
    console.log("Подключено к базе данных!");
  } catch (error) {
    console.log("Error!");
  }
}