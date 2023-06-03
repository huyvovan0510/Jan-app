import {persistStore} from 'redux-persist';
//
import {persistor, sagaMiddleware, store} from './store.config';
import rootSaga from './store.saga';

persistStore(store);
sagaMiddleware.run(rootSaga);

export {persistor, store};
