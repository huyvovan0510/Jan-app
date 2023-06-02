import Config from 'react-native-config';
import {ChatGPTMessage} from '../chat.interface';

const API_CHAT_COMPLETION = 'https://api.openai.com/v1/chat/completions';

const createConversation = async (
  content: string,
  previousConversation: ChatGPTMessage[],
) => {
  try {
    const response = await fetch(API_CHAT_COMPLETION, {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [...previousConversation, {role: 'user', content}],
      }),
    });

    const data = await response?.json();
    return data?.choices[0];
  } catch (error) {
    console.log("\x1b[35;1m' ~ file: chatGpt.service.ts:29 ~ error:", error);
  }
};

export {createConversation};
