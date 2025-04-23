// BSON shim for web browsers
// This provides mock implementations that prevent errors

// Mock ObjectId
class ObjectId {
  constructor(id) {
    this.id = id || Math.random().toString(36).substring(2, 15);
  }
  
  toString() {
    return this.id;
  }
  
  toHexString() {
    return this.id;
  }
  
  equals(otherId) {
    return this.id === (otherId.id || otherId);
  }
}

// Export modules
module.exports = {
  ObjectId,
  // Add other BSON types as needed
  Binary: function() {},
  Code: function() {},
  DBRef: function() {},
  Decimal128: function() {},
  Double: function() {},
  Int32: function() {},
  Long: function() {},
  Map: function() {},
  MaxKey: function() {},
  MinKey: function() {},
  Timestamp: function() {},
  serialize: function() { return Buffer.from([]); },
  deserialize: function() { return {}; }
}; 