import useChatGPT from '@features/Chat/hooks/useChatGPT';
import useReplicate from '@features/Chat/hooks/useReplicate';
import {ChatNavigationParamsList} from '@features/Chat/navigation';
import {goBack} from '@navigation/NavigationServices';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const hooks: any = {
  gpt: useChatGPT,
  replicate: useReplicate,
};

type ConversationScreenNavigationProps = RouteProp<
  ChatNavigationParamsList,
  'ConversationScreen'
>;
const ConversationScreen = () => {
  const route = useRoute<ConversationScreenNavigationProps>();
  const navigation = useNavigation();
  const {params} = route || {};
  const {roomData} = params || {};

  const hookChat = useMemo(
    () => (roomData ? hooks[roomData?.id] : useChatGPT),
    [roomData],
  );

  const {onSendMessage, isGenerating, messages, onSaveMessage} = hookChat(
    roomData?.id,
  );

  const onGoBack = () => {
    onSaveMessage();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onGoBack}>
          <Icon size={25} name="md-arrow-back" />
        </Pressable>
        <Image
          style={styles.avatar}
          source={{
            uri: roomData?.avatar,
          }}
        />
        <Text style={styles.roomName}>{roomData?.roomName}</Text>
      </View>
      <GiftedChat
        messages={messages}
        minComposerHeight={90}
        infiniteScroll={true}
        onSend={message => onSendMessage(message)}
        messagesContainerStyle={styles.messContainer}
        keyboardShouldPersistTaps={'never'}
        user={{
          _id: '-00001',
        }}
        listViewProps={{
          keyboardDismissMode: 'on-drag',
          contentContainerStyle: styles.listContainerStyle,
          onEndReached: () => {}, //inverted list
        }}
        renderFooter={() => (
          <>
            {isGenerating && (
              <View style={styles.footer}>
                <Text>{`${roomData?.roomName} is generating...`}</Text>
              </View>
            )}
          </>
        )}
        renderSend={props => (
          <Pressable
            style={styles.btnSend}
            onPress={() => {
              const {onSend, text} = props;
              onSend?.({text: text?.trim()}, true);
            }}>
            <Text style={styles.txtSend}>Send</Text>
          </Pressable>
        )}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              accessoryStyle={{backgroundColor: 'red'}}
              containerStyle={styles.inputToolbarStyle}
            />
          );
        }}
        renderDay={() => null}
        renderComposer={props => (
          <Composer
            {...props}
            multiline={true}
            placeholder={'Your prompt'}
            textInputProps={{
              maxLength: 4000,
              numberOfLines: 4,
            }}
          />
        )}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.bubbleLeftWrapper,
              right: styles.bubbleRightWrapper,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnSend: {
    backgroundColor: '#385ee5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  inputToolbarStyle: {
    marginHorizontal: 16,
    paddingHorizontal: 8,
    borderTopColor: 'transparent',
    backgroundColor: '#ffff',
    shadowColor: '#dbdff7',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 20,
  },
  messContainer: {paddingBottom: 80, backgroundColor: '#e9ebf6'},
  txtSend: {color: '#ffff'},
  listContainerStyle: {
    flexGrow: 1,
  },
  bubbleLeftWrapper: {backgroundColor: '#ffff', left: -35},
  bubbleRightWrapper: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  roomName: {fontWeight: 'bold', fontSize: 16},
  footer: {paddingHorizontal: 16, paddingVertical: 10},
});
