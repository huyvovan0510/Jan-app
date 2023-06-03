import React, {memo} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {ChatSelectors, useShallowEqualSelector} from '../store/chat.selectors';

interface RightBoxProps {
  roomId: string;
}
const RightBox = ({roomId}: RightBoxProps) => {
  const conversations = useShallowEqualSelector(ChatSelectors.getConversations);
  const LastMessage = conversations?.[roomId]?.[0]?.image;
  const isGenerating = useShallowEqualSelector(ChatSelectors.getIsGenerating);
  const messages = conversations?.[roomId] || [];

  if (messages[0]?.unRead) {
    return <View style={styles.unReadDot}></View>;
  }
  if (isGenerating?.[roomId]) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      {LastMessage && (
        <View style={styles.shadow}>
          <Image source={{uri: LastMessage}} style={styles.leftMessage} />
        </View>
      )}
    </View>
  );
};

export default memo(RightBox);
const styles = StyleSheet.create({
  container: {},
  leftMessage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  unReadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#597af0',
  },
});
