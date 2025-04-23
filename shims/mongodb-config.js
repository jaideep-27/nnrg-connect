// Shim for mongodb.ts in web environment
// This provides a mock implementation that works in browsers

// Mock connection function
const connectToMongoDB = async () => {
  console.log('[Web] Mock MongoDB connection');
  
  // Return a mock DB object
  return {
    collection: (name) => ({
      find: () => ({
        toArray: () => Promise.resolve([])
      }),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
      updateOne: () => Promise.resolve({ modifiedCount: 1 }),
      deleteOne: () => Promise.resolve({ deletedCount: 1 })
    })
  };
};

// Export the connection function
export default connectToMongoDB; 