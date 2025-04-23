import mongoose, { Document, Schema } from 'mongoose';
import { Platform } from 'react-native';

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  rollNumber?: string;
  idCardImage?: string;
  approvalStatus: ApprovalStatus;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT
  },
  rollNumber: {
    type: String,
    trim: true
  },
  idCardImage: {
    type: String
  },
  approvalStatus: {
    type: String,
    enum: Object.values(ApprovalStatus),
    default: ApprovalStatus.PENDING
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index to ensure uniqueness of rollNumber within students
UserSchema.index({ rollNumber: 1, role: 1 }, { 
  unique: true, 
  partialFilterExpression: { 
    rollNumber: { $exists: true },
    role: UserRole.STUDENT
  }
});

// For web environment, create a mock model
const createMockUserModel = () => {
  return {
    findOne: async () => null,
    find: async () => [],
    findById: async () => null,
    findByIdAndUpdate: async () => null,
    deleteOne: async () => ({ deletedCount: 0 }),
    create: async () => ({}),
    save: async () => ({}),
    toObject: () => ({}),
  };
};

let User: any;

if (Platform.OS === 'web') {
  // Use mock model for web
  User = createMockUserModel();
} else {
  // Using a safer pattern for model creation in native environments
  try {
    User = mongoose.model<IUser>('User');
  } catch {
    User = mongoose.model<IUser>('User', UserSchema);
  }
}

export default User;
