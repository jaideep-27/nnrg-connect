// Mongoose shim for web browsers
// This provides mock implementations that prevent errors

// Mock Schema
class Schema {
  constructor(definition, options) {
    this.definition = definition;
    this.options = options;
    this.virtuals = {};
    this.methods = {};
    this.statics = {};
  }
  
  index() {
    return this; // For chaining
  }
  
  virtual(name) {
    const virtual = {
      get: fn => { this.virtuals[name] = { getter: fn }; return virtual; },
      set: fn => { this.virtuals[name] = { ...(this.virtuals[name] || {}), setter: fn }; return virtual; }
    };
    return virtual;
  }
  
  pre() {
    return this; // No-op for middleware
  }
  
  post() {
    return this; // No-op for middleware
  }
  
  method(obj) {
    this.methods = { ...this.methods, ...obj };
    return this;
  }
  
  static(obj) {
    this.statics = { ...this.statics, ...obj };
    return this;
  }
}

// Mock document
class Document {
  constructor(data) {
    Object.assign(this, data);
    this._id = this._id || 'mock-id-' + Date.now();
  }
  
  toObject() {
    return { ...this };
  }
  
  save() {
    return Promise.resolve(this);
  }
}

// Mock model factory
const models = {};
const modelFactory = (name, schema) => {
  if (models[name]) {
    return models[name];
  }
  
  // Create model constructor
  function Model(data) {
    Document.call(this, data);
    // Add schema methods
    Object.assign(this, schema.methods);
  }
  
  // Inherit from Document
  Model.prototype = Object.create(Document.prototype);
  
  // Add static methods
  Object.assign(Model, {
    find: (filter) => {
      return {
        select: () => Promise.resolve([]),
        limit: () => ({ select: () => Promise.resolve([]) }),
        skip: () => ({ limit: () => ({ select: () => Promise.resolve([]) }) }),
        sort: () => ({ select: () => Promise.resolve([]) }),
        exec: () => Promise.resolve([])
      };
    },
    findOne: () => Promise.resolve(null),
    findById: () => Promise.resolve(null),
    create: (data) => Promise.resolve(new Model(data)),
    findByIdAndUpdate: () => Promise.resolve(null),
    updateOne: () => Promise.resolve({ modifiedCount: 1 }),
    deleteOne: () => Promise.resolve({ deletedCount: 1 }),
    ...schema.statics
  });
  
  models[name] = Model;
  return Model;
};

// Mock mongoose
const mongoose = {
  Schema,
  model: modelFactory,
  models,
  
  connect: () => {
    console.log('[Web] Mock Mongoose connected');
    return Promise.resolve();
  },
  
  connection: {
    readyState: 1,
    on: () => mongoose, // For chaining
    once: () => mongoose, // For chaining
    db: { collection: () => ({}) }
  }
};

// Export mongoose
module.exports = mongoose; 