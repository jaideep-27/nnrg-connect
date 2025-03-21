import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';

// Define a type for conversation data
type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: any;
};

// Mock data for conversations
const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    lastMessage: 'Hey, are you coming to the alumni meet next month?',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: require('../assets/images/default-profile.png'),
  },
  {
    id: '2',
    name: 'Priya Patel',
    lastMessage: 'I can help you with the internship opportunity at Microsoft',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: require('../assets/images/default-profile.png'),
  },
  {
    id: '3',
    name: 'Amit Kumar',
    lastMessage: 'The project submission deadline has been extended',
    timestamp: 'Yesterday',
    unread: 1,
    avatar: require('../assets/images/default-profile.png'),
  },
  {
    id: '4',
    name: 'Neha Singh',
    lastMessage: 'Thanks for your help with the resume review!',
    timestamp: 'Monday',
    unread: 0,
    avatar: require('../assets/images/default-profile.png'),
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    lastMessage: 'Let me know if you need any more information about the job opening',
    timestamp: 'Sunday',
    unread: 0,
    avatar: require('../assets/images/default-profile.png'),
  },
];

const MessagesScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <Image
        source={item.avatar}
        style={styles.avatar}
      />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text
            style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <MaterialIcons name="edit" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color={COLORS.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            placeholderTextColor={COLORS.darkGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
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
    fontFamily: FONT.semiBold,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  newMessageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.small,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationContent: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  timestamp: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  unreadMessage: {
    fontFamily: FONT.medium,
    color: COLORS.black,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.small,
  },
  unreadCount: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
    paddingHorizontal: 6,
  },
});

export default MessagesScreen;
