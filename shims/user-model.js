// Shim for User model in web environment
// This provides mock implementations for the User model

// Define enums for compatibility
export const UserRole = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

export const ApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

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

// User model mock
const User = {
  // Create a new User
  create: async (userData) => {
    const newUser = {
      _id: `web-mock-id-${Date.now()}`,
      ...userData,
      toObject: function() {
        const { password, ...rest } = this;
        return rest;
      }
    };
    mockUsers.push(newUser);
    return newUser;
  },
  
  // Find one user
  findOne: async (query) => {
    if (query.email) {
      return mockUsers.find(u => u.email === query.email) || null;
    }
    return null;
  },
  
  // Find users
  find: (query) => {
    let filtered = [...mockUsers];
    
    if (query.role) {
      filtered = filtered.filter(u => u.role === query.role);
    }
    
    if (query.approvalStatus) {
      filtered = filtered.filter(u => u.approvalStatus === query.approvalStatus);
    }
    
    return {
      select: () => filtered
    };
  },
  
  // Find by ID
  findById: async (id) => {
    return mockUsers.find(u => u._id === id) || null;
  },
  
  // Update by ID
  findByIdAndUpdate: async (id, update, options) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) return null;
    
    Object.assign(user, update);
    
    return {
      select: () => user
    };
  },
  
  // Add a new user function
  new: (userData) => {
    return {
      ...userData,
      save: async () => {
        const newUser = {
          _id: `web-mock-id-${Date.now()}`,
          ...userData,
          toObject: function() {
            const { password, ...rest } = this;
            return rest;
          }
        };
        mockUsers.push(newUser);
        return newUser;
      },
      toObject: function() {
        const { password, ...rest } = userData;
        return rest;
      }
    };
  }
};

// Export the User model
export default User; 