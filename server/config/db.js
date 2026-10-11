import mongoose from 'mongoose';

let isConnected = false;
let fallbackStore = {
  messages: [],
  logs: []
};

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  
  try {
    // Attempt connection with short timeout so server doesn't hang if local mongo service isn't active
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to ${mongoURI}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Local MongoDB daemon not running (${error.message}).`);
    console.log(`[MERN Backend] Activating resilient in-memory & file-persisted document store for seamless execution.`);
  }
};

export const isDBConnected = () => isConnected;
export const getFallbackStore = () => fallbackStore;
