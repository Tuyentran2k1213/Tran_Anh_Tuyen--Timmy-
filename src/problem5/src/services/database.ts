import mongoose from "mongoose";
import { enviroments } from "../configs/enviroments.config";

class Database {
  private static instance: Database;
  private connection: mongoose.Connection;

  private constructor() {
    const dbUri = enviroments.MONGO_URI;
    mongoose.connect(dbUri);

    this.connection = mongoose.connection;

    this.connection.on("connected", () => {
      console.log("Mongoose connected to the database");
    });

    this.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    this.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getConnection(): mongoose.Connection {
    return this.connection;
  }
}

export default Database;
