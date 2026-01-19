import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI: string | undefined =
  process.env.DATABASE_MONGODB_CONNECTION_STRING;

if (!MONGODB_URI)
  throw new Error(
    "Unable to connect to MongoDB. Please define the DATABASE_MONGODB_CONNECTION_STRING variable inside .env.local file."
  );

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "TrumVR_Main_DB_Test", // TODO Duy: need rename the DB to: VR_Main_DB for vrtube & myvr
      serverSelectionTimeoutMS: 10000,
      maxIdleTimeMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 1,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
