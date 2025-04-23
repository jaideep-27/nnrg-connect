import mongoose from 'mongoose';
import { Platform } from 'react-native';

// Use a direct approach for development
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.m38gyav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  // In web environment, return a mock DB to prevent connection errors
  if (Platform.OS === 'web') {
    console.log('Running in web environment - MongoDB connections are not supported in browsers');
    // Return a mock object that simulates the MongoDB connection for web
    return {
      collection: () => ({
        find: () => [],
        findOne: () => null,
        insertOne: () => ({ insertedId: 'mock-id' }),
        updateOne: () => ({ modifiedCount: 1 }),
        deleteOne: () => ({ deletedCount: 1 })
      })
    };
  }

  // For native environments, proceed with real MongoDB connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    return mongoose.connection.db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectToMongoDB;
