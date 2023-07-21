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
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [...previousConversation, {role: 'user', content}],
      }),
    });

    const data = await response?.json();
    return data?.choices[0]?.message?.content;
  } catch (error) {
    console.log("\x1b[35;1m' ~ chatGpt.service ERROR", error);
  }
};

export {createConversation};
