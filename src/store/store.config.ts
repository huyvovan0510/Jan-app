import {ChatReducer as chat} from '@features/Chat/store/chat.slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AnyAction,
  CombinedState,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {RootState} from './store.interface';

const middleWares: Array<any> = [];

const enhancers: Array<any> = [];

const appReducer = combineReducers({
  chat,
});

const PERSIST_BLACK_LIST: any[] = [];

const PERSIST_WHITE_LIST: any[] = ['chat'];

const PERSIST_DEBOUNCE_TIME = 250;

const PERSIST_CONFIG = {
  storage: AsyncStorage,
  key: 'Jan-app',
  blacklist: PERSIST_BLACK_LIST,
  whitelist: PERSIST_WHITE_LIST,
  debounce: PERSIST_DEBOUNCE_TIME,
};

const rootReducer = (
  state: CombinedState<RootState> | undefined,
  action: AnyAction,
) => {
  // @ts-ignore
  return appReducer(state, action);
};

// @ts-ignore
const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

const sagaMiddleware = createSagaMiddleware({
  onError: () => {
    console.log("\x1b[35;1m' ~ file: store.config.ts:60 ~ onError:");
  },
});

middleWares.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middleWares));

const store = createStore(
  persistedReducer,
  // @ts-ignore
  compose(...enhancers),
);

const persistor = persistStore(store);

export {persistor, sagaMiddleware, store};
