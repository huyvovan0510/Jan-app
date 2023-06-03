import {RoomData} from '@features/Chat/chat.interface';
import RoomItem from '@features/Chat/components/RoomItem';
import {
  ChatSelectors,
  useShallowEqualSelector,
} from '@features/Chat/store/chat.selectors';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const data = [
  {
    id: 'gpt',
    roomName: 'Chat GPT',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png',
    lastMessage: '',
  },

  {
    id: 'replicate',
    roomName: 'Replica',
    avatar: 'https://replicate.com/static/favicon.e390e65c9599.png',
    lastMessage: '',
  },
];

const ChatScreen = () => {
  const renderRooms = useCallback(
    ({item, index}: {item: RoomData; index: number}) => (
      <RoomItem item={item} index={index} />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        // onChangeText={(text: string) => {}}
      />
      <View style={styles.content}>
        <FlashList
          data={data}
          renderItem={renderRooms}
          estimatedItemSize={100}
          contentContainerStyle={styles.contentListStule}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  chatHeader: {
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  searchBar: {
    backgroundColor: '#eeeff5',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  contentListStule: {
    paddingTop: 20,
  },
});
