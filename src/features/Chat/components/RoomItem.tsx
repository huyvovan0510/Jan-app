import {navigate} from '@navigation/NavigationServices';
import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ROOM_ITEM_HEIGHT} from '../chat.constants';
import {RoomData} from '../chat.interface';
import {createConversation} from '../services/chatGpt.service';

interface RoomItemProps {
  item: RoomData;
  index?: number;
}
const RoomItem = ({item}: RoomItemProps) => {
  const openConversation = () => {
    navigate('ConversationScreen', {roomData: item});
  };

  return (
    <Pressable style={styles.container} onPress={openConversation}>
      <View style={styles.avatarBox}>
        <Image source={{uri: item?.avatar}} style={styles.avatar} />
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.txtRoomName}>
          {item?.roomName}
        </Text>
        <Text style={styles.txtLastMessage} numberOfLines={1}>
          {item?.lastMessage || "Let's get started"}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(RoomItem);

const styles = StyleSheet.create({
  container: {
    height: ROOM_ITEM_HEIGHT,
    backgroundColor: '#ffff',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {},
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  content: {
    marginHorizontal: 12,
  },
  txtRoomName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  txtLastMessage: {
    fontWeight: '300',
    color: '#747474',
  },
});
