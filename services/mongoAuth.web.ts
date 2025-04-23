import AsyncStorage from '@react-native-async-storage/async-storage';

// Define enums for compatibility
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Mock users for web
const mockUsers = [
  {
    _id: 'web-admin-id',
    email: 'admin@nnrg.edu.in',
    name: 'Admin User',
    role: UserRole.ADMIN,
    approvalStatus: ApprovalStatus.APPROVED,
    password: '123456' // In a real app, this would be hashed
  },
  {
    _id: 'web-student-id',
    email: 'student@nnrg.edu.in',
    name: 'Student User',
    role: UserRole.STUDENT,
    rollNumber: 'ABC123',
    approvalStatus: ApprovalStatus.APPROVED,
    password: '123456'
  }
];

// Helper function to hash passwords
const hashPassword = async (password: string): Promise<string> => {
  // Simple hash for demonstration
  return Array.from(password)
    .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
    .toString(16);
};

// Helper function to verify password
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const hashed = await hashPassword(password);
  return hashed === hashedPassword;
};

// Store user session
const storeUserSession = async (user: any) => {
  const userData = {
    id: user._id || 'web-mock-id',
    email: user.email,
    name: user.name,
    role: user.role,
    approvalStatus: user.approvalStatus,
    rollNumber: user.rollNumber || ''
  };
  
  await AsyncStorage.setItem('user', JSON.stringify(userData));
  return userData;
};

// Get current user from AsyncStorage
const getCurrentUser = async () => {
  const userJson = await AsyncStorage.getItem('user');
  if (!userJson) return null;
  return JSON.parse(userJson);
};

// Register a new user - web mock version
const registerUser = async (
  email: string, 
  password: string, 
  name: string, 
  rollNumber: string, 
  idCardImageUri: string
): Promise<any> => {
  try {
    console.log('[Web] Mock registration for:', email);
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const newUser = {
      _id: `web-user-${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      rollNumber,
      idCardImage: idCardImageUri,
      role: UserRole.STUDENT,
      approvalStatus: ApprovalStatus.APPROVED // Auto-approve in web mock
    };
    
    // Add to mock users
    mockUsers.push(newUser);
    
    // Store user session without password
    const { password: _, ...userWithoutPassword } = newUser;
    return await storeUserSession(userWithoutPassword);
  } catch (error: any) {
    console.error('[Web] Registration error:', error);
    throw new Error(error.message || 'Failed to register user');
  }
};

// Login user - web mock version
const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    console.log('[Web] Mock login for:', email);
    
    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // For demo purposes in web, accept any password
    // In real app, you'd verify the password
    
    // Store user session
    return await storeUserSession(user);
  } catch (error: any) {
    console.error('[Web] Login error:', error);
    throw new Error(error.message || 'Failed to login');
  }
};

// Logout user
const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error: any) {
    console.error('[Web] Logout error:', error);
    throw new Error('Failed to logout');
  }
};

// Check if user is authenticated
const isAuthenticated = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    return false;
  }
};

// Get all pending approval requests (admin only) - web mock version
const getPendingApprovals = async (): Promise<any[]> => {
  console.log('[Web] Getting mock pending approvals');
  return mockUsers.filter(u => 
    u.role === UserRole.STUDENT && 
    u.approvalStatus === ApprovalStatus.PENDING
  );
};

// Update user approval status (admin only) - web mock version
const updateUserApproval = async (userId: string, status: ApprovalStatus): Promise<any> => {
  try {
    console.log('[Web] Updating mock approval status:', userId, status);
    
    const userIndex = mockUsers.findIndex(u => u._id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update status
    mockUsers[userIndex].approvalStatus = status;
    
    return mockUsers[userIndex];
  } catch (error: any) {
    console.error('[Web] Error updating user approval:', error);
    throw new Error('Failed to update user approval status');
  }
};

// Create admin user if it doesn't exist - web mock version
const ensureAdminExists = async (): Promise<void> => {
  console.log('[Web] Ensuring admin exists - mock operation, no action needed');
  // Admin already exists in mockUsers
};

const mongoAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  getPendingApprovals,
  updateUserApproval,
  ensureAdminExists
};

export default mongoAuthService; 