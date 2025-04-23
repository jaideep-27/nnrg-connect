// This file provides mock implementations for MongoDB/Mongoose in web environments
// It is NOT an actual database - just mock functions to prevent errors

// Enums needed for type compatibility
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Mock user data
const mockUsers = [
  {
    _id: 'web-mock-id-1',
    email: 'admin@nnrg.edu.in',
    name: 'Admin User',
    role: UserRole.ADMIN,
    approvalStatus: ApprovalStatus.APPROVED,
    password: '123456', // In a real app, this would be hashed
    toObject: function() {
      const { password, ...rest } = this;
      return rest;
    }
  },
  {
    _id: 'web-mock-id-2',
    email: 'student@nnrg.edu.in',
    name: 'Student User',
    role: UserRole.STUDENT,
    rollNumber: 'ABC123',
    approvalStatus: ApprovalStatus.APPROVED,
    password: '123456',
    toObject: function() {
      const { password, ...rest } = this;
      return rest;
    }
  }
];

// NOT an async function - synchronous mock DB connector
export const connectToMongoDB = () => {
  console.log('[Web] Mock MongoDB connected');
  return {
    collection: () => ({
      find: () => ({ toArray: () => mockUsers }),
      findOne: () => mockUsers[0]
    })
  };
};

// Mock User model that doesn't use async functions
export const User = {
  findOne: (query: any) => {
    if (query && query.email) {
      return Promise.resolve(mockUsers.find(u => u.email === query.email) || null);
    }
    return Promise.resolve(mockUsers[0]);
  },
  find: (query: any) => {
    let filtered = [...mockUsers];
    
    if (query && query.role) {
      filtered = filtered.filter(u => u.role === query.role);
    }
    
    if (query && query.approvalStatus) {
      filtered = filtered.filter(u => u.approvalStatus === query.approvalStatus);
    }
    
    return {
      select: () => Promise.resolve(filtered)
    };
  },
  findById: (id: string) => {
    return Promise.resolve(mockUsers.find(u => u._id === id) || null);
  },
  findByIdAndUpdate: (id: string, update: any) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) return Promise.resolve(null);
    
    Object.assign(user, update);
    
    return {
      select: () => Promise.resolve(user)
    };
  }
};

// Export in the format that the app expects
export default {
  connectToMongoDB,
  User
}; 