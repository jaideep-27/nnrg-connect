import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import SearchBar from '../components/SearchBar';

// Mock data for batch groups
const batchGroups = [
  {
    id: '1',
    name: 'CSE 2022-26',
    members: 120,
    description: 'Group for Computer Science Engineering batch 2022-26',
    image: require('../assets/images/default-profile.png'),
  },
  {
    id: '2',
    name: 'ECE 2022-26',
    members: 90,
    description: 'Group for Electronics and Communication Engineering batch 2022-26',
    image: require('../assets/images/default-profile.png'),
  },
  {
    id: '3',
    name: 'MECH 2022-26',
    members: 75,
    description: 'Group for Mechanical Engineering batch 2022-26',
    image: require('../assets/images/default-profile.png'),
  },
  {
    id: '4',
    name: 'CIVIL 2022-26',
    members: 60,
    description: 'Group for Civil Engineering batch 2022-26',
    image: require('../assets/images/default-profile.png'),
  },
  {
    id: '5',
    name: 'CSE 2021-25',
    members: 115,
    description: 'Group for Computer Science Engineering batch 2021-25',
    image: require('../assets/images/default-profile.png'),
  },
  {
    id: '6',
    name: 'ECE 2021-25',
    members: 85,
    description: 'Group for Electronics and Communication Engineering batch 2021-25',
    image: require('../assets/images/default-profile.png'),
  },
];

const BatchGroupsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(batchGroups);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredGroups(batchGroups);
    } else {
      const filtered = batchGroups.filter(
        (group) => group.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  };

  const renderGroupItem = ({ item }: { item: typeof batchGroups[0] }) => (
    <TouchableOpacity
      style={styles.groupCard}
      onPress={() => router.push({ pathname: '/group-details', params: { id: item.id } })}
    >
      <Image source={item.image} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>{item.members} members</Text>
        <Text style={styles.groupDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={COLORS.darkGray} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Batch Groups</Text>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search batch groups..."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={() => {}}
          showFilter={false}
        />
      </View>
      
      <FlatList
        data={filteredGroups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.groupsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: SIZES.medium,
  },
  groupsList: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.medium,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 2,
  },
  groupMembers: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginBottom: 4,
  },
  groupDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
});

export default BatchGroupsScreen;
