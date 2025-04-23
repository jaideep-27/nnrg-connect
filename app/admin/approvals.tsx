import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';
import mongoAuthService from '../../services/mongoAuth';
import { ApprovalStatus } from '../../models/User';

interface PendingUser {
  _id: string;
  name: string;
  email: string;
  rollNumber: string;
  idCardImage: string;
  createdAt: Date;
}

const AdminApprovalsScreen = () => {
  const router = useRouter();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPendingApprovals = async () => {
    try {
      const users = await mongoAuthService.getPendingApprovals();
      setPendingUsers(users);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load pending approvals');
      console.error('Error loading pending approvals:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPendingApprovals();
  }, []);

  const handleApproval = async (userId: string, status: ApprovalStatus) => {
    try {
      await mongoAuthService.updateUserApproval(userId, status);
      Alert.alert(
        'Success',
        `User has been ${status === ApprovalStatus.APPROVED ? 'approved' : 'rejected'}`
      );
      loadPendingApprovals(); // Refresh the list
    } catch (error: any) {
      Alert.alert('Error', 'Failed to update user approval status');
      console.error('Error updating approval:', error);
    }
  };

  const renderUserItem = ({ item }: { item: PendingUser }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRollNumber}>Roll Number: {item.rollNumber}</Text>
        <Text style={styles.userDate}>
          Requested on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {item.idCardImage && (
        <View style={styles.idCardContainer}>
          <Text style={styles.idCardLabel}>ID Card:</Text>
          <Image
            source={{ uri: item.idCardImage }}
            style={styles.idCardImage}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleApproval(item._id, ApprovalStatus.APPROVED)}
        >
          <MaterialIcons name="check-circle" size={24} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleApproval(item._id, ApprovalStatus.REJECTED)}
        >
          <MaterialIcons name="cancel" size={24} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading pending approvals...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Approvals</Text>
        <View style={{ width: 24 }} />
      </View>

      {pendingUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="check-circle" size={64} color={COLORS.secondaryLight} />
          <Text style={styles.emptyText}>No pending approvals</Text>
          <Text style={styles.emptySubText}>
            All user requests have been processed
          </Text>
        </View>
      ) : (
        <FlatList
          data={pendingUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadPendingApprovals();
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginTop: SIZES.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  listContainer: {
    padding: SIZES.medium,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  userInfo: {
    marginBottom: SIZES.medium,
  },
  userName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SIZES.small / 2,
  },
  userEmail: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small / 2,
  },
  userRollNumber: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small / 2,
  },
  userDate: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  idCardContainer: {
    marginBottom: SIZES.medium,
  },
  idCardLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  idCardImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.small,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.medium,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.small,
  },
  approveButton: {
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginLeft: SIZES.small,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  emptyText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.darkGray,
    marginTop: SIZES.medium,
  },
  emptySubText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.small,
  },
});

export default AdminApprovalsScreen; 