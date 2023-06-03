import {navigate} from '@navigation/NavigationServices';
import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ROOM_ITEM_HEIGHT} from '../chat.constants';
import {RoomData} from '../chat.interface';
import {createConversation} from '../services/chatGpt.service';
import LastMessage from './LastMessage';
import RightBox from './RightBox';

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
        <View style={styles.tag}>
          <Text style={styles.txtTag}>Free</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.txtRoomName}>
          {item?.roomName}
        </Text>
        <LastMessage roomId={item?.id} />
      </View>
      <RightBox roomId={item?.id} />
    </Pressable>
  );
};

export default memo(RoomItem);

const styles = StyleSheet.create({
  container: {
    height: ROOM_ITEM_HEIGHT,
    backgroundColor: '#ffff',
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  leftMessage: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  content: {
    marginHorizontal: 12,
    flex: 1,
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
  tag: {
    backgroundColor: '#11af63',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: -12,
  },
  txtTag: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
