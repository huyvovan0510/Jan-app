import ChatSaga from '@features/Chat/store/chat.saga';
import {all} from 'redux-saga/effects';

export default function* Sagas() {
  try {
    yield all([ChatSaga()]);
  } catch {}
}
