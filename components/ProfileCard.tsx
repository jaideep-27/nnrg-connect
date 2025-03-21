import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';

interface ProfileCardProps {
  name: string;
  rollNumber: string;
  batch?: string;
  department?: string;
  profileImage?: any;
  status?: 'Student' | 'Alumni';
  fatherName?: string;
  phoneNumber?: string;
  onPress?: () => void;
}

const ProfileCard = ({
  name,
  rollNumber,
  batch,
  department,
  profileImage,
  status = 'Student',
  fatherName,
  phoneNumber,
  onPress,
}: ProfileCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={profileImage || require('../assets/images/default-profile.png')}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={[
          styles.statusBadge,
          status === 'Alumni' ? styles.alumniStatusBadge : styles.studentStatusBadge
        ]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.detail}>{rollNumber}</Text>
        {batch && department && (
          <Text style={styles.detail}>{batch} • {department}</Text>
        )}
        {fatherName && (
          <Text style={styles.detail}>Father: {fatherName}</Text>
        )}
        {phoneNumber && (
          <Text style={styles.detail}>Phone: {phoneNumber}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    ...SHADOWS.medium,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    marginRight: SIZES.medium,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: 2,
    borderRadius: 10,
    ...SHADOWS.small,
  },
  studentStatusBadge: {
    backgroundColor: COLORS.primary,
  },
  alumniStatusBadge: {
    backgroundColor: COLORS.secondary,
  },
  statusText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  detail: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: 2,
  },
});

export default ProfileCard;
