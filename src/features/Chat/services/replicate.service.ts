import Config from 'react-native-config';
import {ChatGPTMessage} from '../chat.interface';

const API_INIT_MODEL = 'https://api.replicate.com/v1/predictions';
const API_TO_GEN_IMAGE = (id: string) =>
  `https://api.replicate.com/v1/predictions/${id}`;

const wakeUpModel = async (prompt: string) => {
  try {
    const response = await fetch(API_INIT_MODEL, {
      method: 'POST',
      headers: {
        Authorization: 'Token r8_Pj8MkxKKz3etXAMzzt5fmA2GC6fCsbI0uA2bQ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version:
          'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
        input: {prompt: prompt},
      }),
    });

    const data = await response?.json();
    return data?.id;
  } catch (error) {}
};

const generationImage = async (predictionId: string, prompt: string) => {
  try {
    if (predictionId) {
      const apiUrl = API_TO_GEN_IMAGE(predictionId);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: 'Token r8_Pj8MkxKKz3etXAMzzt5fmA2GC6fCsbI0uA2bQ',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version:
            'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
          input: {prompt},
        }),
      });

      const data = await response?.json();
      return {url: data?.output?.[0], status: data?.status};
    }
    return null;
  } catch (error) {
    console.log("\x1b[35;1m' ~replicate.service~generationImage: ERROR", error);
  }
};

export {generationImage, wakeUpModel};
