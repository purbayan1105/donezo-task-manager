import mongoose from "mongoose";

const configDB = {
  isConnected: 0,
};

export async function connectDB() {
  if (configDB.isConnected) {
    console.log("database already connected");
    return;
  } else {
    try {
      const { connection } = await mongoose.connect(
        process.env.Mongo_DB_URL as string,
        { dbName: "DoneZo_task_manager" } //cant provide space
      );
      console.log("DB connected");
    } catch (error) {
      console.log("error at DBConnect");
    }
  }
}
