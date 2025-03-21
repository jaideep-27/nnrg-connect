import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';

// Define types for messages
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
};

// Define type for conversation
type ConversationType = {
  id: string;
  name: string;
  avatar: any;
  messages: Message[];
};

// Define type for conversations dictionary
type ConversationsType = {
  [key: string]: ConversationType;
};

// Mock data for conversations
const conversations: ConversationsType = {
  '1': {
    id: '1',
    name: 'Rahul Sharma',
    avatar: require('../../assets/images/default-profile.png'),
    messages: [
      {
        id: '1',
        text: 'Hey, are you coming to the alumni meet next month?',
        sender: 'other',
        timestamp: '10:30 AM',
      },
      {
        id: '2',
        text: 'Yes, I\'m planning to attend. What about you?',
        sender: 'user',
        timestamp: '10:32 AM',
      },
      {
        id: '3',
        text: 'I\'ll be there! Looking forward to seeing everyone after so long.',
        sender: 'other',
        timestamp: '10:33 AM',
      },
      {
        id: '4',
        text: 'Do you know who else from our batch is coming?',
        sender: 'user',
        timestamp: '10:35 AM',
      },
      {
        id: '5',
        text: 'I heard Priya, Amit, and a few others are confirmed. The organizers are expecting around 70% attendance from our batch.',
        sender: 'other',
        timestamp: '10:38 AM',
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Priya Patel',
    avatar: require('../../assets/images/default-profile.png'),
    messages: [
      {
        id: '1',
        text: 'Hi, I saw your post about looking for internship opportunities.',
        sender: 'other',
        timestamp: 'Yesterday',
      },
      {
        id: '2',
        text: 'Yes, I\'m currently searching for a summer internship in software development.',
        sender: 'user',
        timestamp: 'Yesterday',
      },
      {
        id: '3',
        text: 'I can help you with the internship opportunity at Microsoft. We have openings for summer interns.',
        sender: 'other',
        timestamp: 'Yesterday',
      },
    ],
  },
};

const ChatScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const chatId = params.id as string;
  
  const conversation = conversations[chatId] || conversations['1'];
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(conversation.messages);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
    </View>
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
        <View style={styles.headerProfile}>
          <Image
            source={conversation.avatar}
            style={styles.avatar}
          />
          <Text style={styles.headerName}>{conversation.name}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <MaterialIcons name="attach-file" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.darkGray}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newMessage.trim() && styles.disabledSendButton]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <MaterialIcons name="send" size={24} color={newMessage.trim() ? COLORS.primary : COLORS.lightGray} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small,
  },
  headerName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesList: {
    padding: SIZES.medium,
  },
  messageContainer: {
    marginBottom: SIZES.medium,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    padding: SIZES.medium,
    ...SHADOWS.small,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: COLORS.lightGray,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 4,
  },
  messageTime: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    padding: SIZES.small,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    paddingHorizontal: SIZES.small,
  },
  attachButton: {
    padding: SIZES.small,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
    maxHeight: 100,
    padding: SIZES.small,
  },
  sendButton: {
    padding: SIZES.small,
  },
  disabledSendButton: {
    opacity: 0.5,
  },
});

export default ChatScreen;
