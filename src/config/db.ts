import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config();

let mongoServer: MongoMemoryServer | undefined;

async function connect(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", false);

  const url =
    process.env.NODE_ENV === "test"
      ? await startTestDatabase()
      : (process.env.MONGODB_URL as string);

  return mongoose.connect(url);
}

async function startTestDatabase(): Promise<string> {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();
  return uri;
}

async function closeDatabase(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (process.env.NODE_ENV === "test" && mongoServer) {
    await mongoServer.stop();
  }
}

export { connect, closeDatabase };
