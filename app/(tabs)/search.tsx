import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';
import ProfileCard from '../../components/ProfileCard';
import { databaseService, StudentData } from '../../services/database';

interface User {
  id: string;
  name: string;
  rollNumber: string;
  batch: string;
  department: string;
  status: 'Student' | 'Alumni';
  fatherName?: string;
  motherName?: string;
  gender?: string;
  dob?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  parentPhoneNumber?: string;
};

// Department options for filter
const departmentOptions = ['All', 'CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'IT'];

// Batch year options for filter
const batchOptions = ['All', '2019-23', '2020-24', '2021-25'];

// Status options for filter
const statusOptions = ['All', 'Student', 'Alumni'];

const SearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter states
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setIsLoading(true);
      console.log('Search screen: Loading student data...');
      const studentData = await databaseService.loadStudentData();
      console.log('Search screen: Student data loaded:', studentData.length, 'students');
      
      // Convert StudentData to User type
      const userData: User[] = studentData.map(student => ({
        id: student.id,
        name: student.name,
        rollNumber: student.rollNumber || 'N/A',
        batch: student.batch || 'N/A',
        department: student.department || 'N/A',
        status: 'Student', // Default to Student status
        fatherName: student.fatherName,
        motherName: student.motherName,
        gender: student.gender,
        dob: student.dob,
        address: student.address,
        email: student.email,
        phoneNumber: student.phoneNumber,
        parentPhoneNumber: student.parentPhoneNumber
      }));
      
      console.log('Search screen: Converted to user data:', userData.length, 'users');
      setUsers(userData);
      setFilteredUsers(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading student data:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    if (!text.trim()) {
      applyFilters(selectedDepartment, selectedBatch, selectedStatus);
      return;
    }

    const searchTerm = text.toLowerCase();
    const results = users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.rollNumber.toLowerCase().includes(searchTerm) ||
        user.department.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(results);
  };

  const applyFilters = (department: string, batch: string, status: string) => {
    let results = [...users];

    if (department !== 'All') {
      results = results.filter(user => user.department === department);
    }

    if (batch !== 'All') {
      results = results.filter(user => user.batch === batch);
    }

    if (status !== 'All') {
      results = results.filter(user => user.status === status);
    }

    if (searchText) {
      const searchTerm = searchText.toLowerCase();
      results = results.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.rollNumber.toLowerCase().includes(searchTerm) ||
          user.department.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredUsers(results);
  };

  const handleUserPress = (user: User) => {
    router.push(`/profile?id=${user.rollNumber}`);
  };

  const renderUserItem = ({ item, index }: { item: User; index: number }) => {
    console.log('Rendering user item:', item.name, item.rollNumber);
    return (
      <View style={styles.userItemContainer}>
        <ProfileCard
          name={item.name}
          rollNumber={item.rollNumber}
          batch={item.batch}
          department={item.department}
          status={item.status as 'Student' | 'Alumni'}
          fatherName={item.fatherName}
          phoneNumber={item.phoneNumber}
          onPress={() => handleUserPress(item)}
        />
      </View>
    );
  };

  const renderFilterOption = (
    title: string, 
    options: string[], 
    selectedOption: string, 
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <View style={styles.filterOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterOption,
              selectedOption === option && styles.selectedFilterOption
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={[
              styles.filterOptionText,
              selectedOption === option && styles.selectedFilterOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearch(text);
            }}
            placeholder="Search by name or roll number"
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setShowFilterModal(true)}
        >
          <Feather name="filter" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.resultCount}>Found {filteredUsers.length} students</Text>
          {filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.usersList}
              showsVerticalScrollIndicator={false}
              numColumns={1}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search-off" size={64} color={COLORS.secondaryLight} />
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubText}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </>
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Students</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            {renderFilterOption('Department', departmentOptions, selectedDepartment, setSelectedDepartment)}
            {renderFilterOption('Batch', batchOptions, selectedBatch, setSelectedBatch)}
            {renderFilterOption('Status', statusOptions, selectedStatus, setSelectedStatus)}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.resetButton]}
                onPress={() => {
                  setSelectedDepartment('All');
                  setSelectedBatch('All');
                  setSelectedStatus('All');
                }}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.applyButton]}
                onPress={() => {
                  applyFilters(selectedDepartment, selectedBatch, selectedStatus);
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    ...SHADOWS.small,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.small,
    height: 50,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCount: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  usersList: {
    padding: SIZES.xSmall,
  },
  userItemContainer: {
    marginBottom: SIZES.medium,
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.gray,
    marginTop: SIZES.medium,
  },
  emptySubText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SIZES.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  modalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  filterSection: {
    marginBottom: SIZES.medium,
  },
  filterTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.xSmall / 2,
  },
  filterOption: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.small,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    margin: SIZES.xSmall / 2,
  },
  selectedFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  selectedFilterOptionText: {
    color: COLORS.white,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.medium,
  },
  modalButton: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: 5,
    marginLeft: SIZES.small,
  },
  resetButton: {
    backgroundColor: COLORS.lightGray,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
  },
  resetButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  applyButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});

export default SearchScreen;
