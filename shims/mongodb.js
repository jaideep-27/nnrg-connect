// MongoDB shim for web browsers
// This provides mock implementations that prevent errors

// Mock collection
class Collection {
  constructor(name) {
    this.name = name;
  }
  
  find() {
    return {
      toArray: () => Promise.resolve([])
    };
  }
  
  findOne() {
    return Promise.resolve(null);
  }
  
  insertOne(doc) {
    return Promise.resolve({ insertedId: 'mock-id' });
  }
  
  updateOne() {
    return Promise.resolve({ modifiedCount: 1 });
  }
  
  deleteOne() {
    return Promise.resolve({ deletedCount: 1 });
  }
}

// Mock DB
class Db {
  constructor(name) {
    this.name = name;
    this.collections = {};
  }
  
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(name);
    }
    return this.collections[name];
  }
}

// Mock client
class MongoClient {
  constructor() {
    this.db = new Db('mock-db');
  }
  
  static connect() {
    return Promise.resolve(new MongoClient());
  }
  
  db() {
    return this.db;
  }
  
  close() {
    return Promise.resolve();
  }
}

// Mock ObjectId
class ObjectId {
  constructor(id) {
    this.id = id || 'mock-id-' + Date.now();
  }
  
  toString() {
    return this.id;
  }
}

// Export everything that might be used
module.exports = {
  MongoClient,
  ObjectId,
  connect: MongoClient.connect,
  // Add other MongoDB exports as needed
}; 