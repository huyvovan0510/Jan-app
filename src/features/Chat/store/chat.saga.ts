import {IMessage} from 'react-native-gifted-chat';
import {all, call, delay, put, select, takeLatest} from 'redux-saga/effects';
import {REPLICATE_AI_RESULT_STATUS} from '../chat.constants';
import {
  ChatGPTMessage,
  Conversations,
  ReplicateAiResult,
} from '../chat.interface';
import {createMessageTemplate} from '../chat.utils';
import {createConversation} from '../services/chatGpt.service';
import {generationImage, wakeUpModel} from '../services/replicate.service';
import {ChatSelectors} from './chat.selectors';
import {ChatAction, ChatTypes} from './chat.slices';
const DELAY_TIME = 1000;
function* replicateGenerationImage({
  payload,
}: {
  type: typeof ChatTypes.REPLICATE_GENERATION_IMAGE;
  payload: {
    roomId: string;
    prompt: string;
    callback?: (url: string) => void;
  };
}) {
  const {prompt, callback, roomId} = payload || {};
  const predictionId: string = yield call(wakeUpModel, prompt);
  if (predictionId) {
    while (true) {
      try {
        const result: ReplicateAiResult = yield call(
          generationImage,
          predictionId,
          prompt,
        );
        console.log(
          "\x1b[35;1m' ~ file: chat.saga.ts:35 ~ result:",
          result.status,
        );

        if (
          [
            REPLICATE_AI_RESULT_STATUS.SUCCEEDED,
            REPLICATE_AI_RESULT_STATUS.FAILED,
          ].includes(result?.status)
        ) {
          callback?.(result.url);

          const conversations: Conversations = yield select(
            ChatSelectors.getConversations,
          );
          const previousMessage = conversations?.[roomId] || [];
          const newMessage: IMessage = createMessageTemplate({
            url: result.url,
            unRead: true,
          });
          const dataMessage = [newMessage, ...previousMessage];
          yield put(ChatAction.updateRoomStatus({roomId, isGenerating: false}));
          yield put(
            ChatAction.saveConversation({roomId, messages: dataMessage}),
          );

          break;
        }
      } catch (error) {}
      yield delay(DELAY_TIME); // Wait for 3 seconds before calling the API again
    }
  }
}

function* sendMessageToChatGPT({
  payload,
}: {
  type: typeof ChatTypes.SEND_MESSAGE_TO_CHAT_GPT;
  payload: {
    roomId: string;
    content: string;
    previousContext: ChatGPTMessage[];
  };
}) {
  const {content, previousContext, roomId} = payload || {};

  const text: string = yield call(createConversation, content, previousContext);

  const conversations: Conversations = yield select(
    ChatSelectors.getConversations,
  );
  const previousMessage = conversations?.[roomId] || [];
  const newMessage: IMessage = createMessageTemplate({
    content: text,
    unRead: true,
  });

  const dataMessage = [newMessage, ...previousMessage];

  yield put(ChatAction.saveConversation({roomId, messages: dataMessage}));
  yield put(ChatAction.updateRoomStatus({roomId, isGenerating: false}));
}

const chatSaga = [
  takeLatest(ChatTypes.REPLICATE_GENERATION_IMAGE, replicateGenerationImage),
  takeLatest(ChatTypes.SEND_MESSAGE_TO_CHAT_GPT, sendMessageToChatGPT),
];

export default function* ChatSaga() {
  yield all([...chatSaga]);
}
