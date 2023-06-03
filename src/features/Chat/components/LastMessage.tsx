import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatSelectors, useShallowEqualSelector} from '../store/chat.selectors';

interface LastMessageProps {
  roomId: string;
}
const LastMessage = ({roomId}: LastMessageProps) => {
  const conversations = useShallowEqualSelector(ChatSelectors.getConversations);
  const isGenerating = useShallowEqualSelector(ChatSelectors.getIsGenerating);
  const messages = conversations?.[roomId] || [];

  if (messages[0]?.unRead) {
    return (
      <Text style={styles.unReadMessage} numberOfLines={1}>
        {'Messages'}
      </Text>
    );
  }

  if (isGenerating?.[roomId])
    return (
      <Text style={styles.txtGenerating} numberOfLines={1}>
        {'Generating...'}
      </Text>
    );

  const LastMessage =
    messages?.length > 0
      ? conversations?.[roomId]?.[0]?.text || 'Media message'
      : 'Let`s get started';

  return (
    <Text style={styles.txtLastMessage} numberOfLines={1}>
      {LastMessage}
    </Text>
  );
};

export default memo(LastMessage);

const styles = StyleSheet.create({
  txtLastMessage: {
    color: '#747474',
  },
  txtGenerating: {
    color: '#597af0',
  },
  unReadMessage: {
    fontWeight: 'bold',
    color: '#597af0',
  },
});
