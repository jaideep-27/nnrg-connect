import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { databaseService, StudentData } from '../services/database';

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        // Make sure students are loaded first
        await databaseService.loadStudentData();
        const foundStudent = databaseService.getStudentById(id as string);
        setStudent(foundStudent);
      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStudentData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Student not found</Text>
      </View>
    );
  }

  const DetailRow = ({ label, value }: { label: string; value: string | number | undefined }) => (
    value ? (
      <View style={styles.detailRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ) : null
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.subHeader}>{student.rollNumber}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <DetailRow label="Department" value={student.department} />
        <DetailRow label="Batch" value={student.batch} />
        <DetailRow label="Father's Name" value={student.fatherName} />
        <DetailRow label="Mother's Name" value={student.motherName} />
        <DetailRow label="Date of Birth" value={student.dob} />
        <DetailRow label="Gender" value={student.gender} />
        <DetailRow label="Phone Number" value={student.phoneNumber} />
        <DetailRow label="Parent's Phone" value={student.parentPhoneNumber} />
        <DetailRow label="Email" value={student.email} />
        <DetailRow label="Address" value={student.address} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.large,
    backgroundColor: COLORS.primary,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    marginBottom: SIZES.xSmall,
  },
  subHeader: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  detailsContainer: {
    padding: SIZES.medium,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    width: '40%',
  },
  value: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
    flex: 1,
  },
  errorText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SIZES.xxLarge,
  },
  loadingText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.xxLarge,
  },
});

export default ProfileScreen;
