import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsOpen, wsClose, wsError, wsMessage, TWsInternalActions } from './feed/reducer';
import { wsConnect, wsDisconnect, TWsExternalActions } from './feed/actions';

const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

const feedProfileMiddleWare = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
}, true);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, feedProfileMiddleWare);
  }
});

//type TApplicationActions = TWsExternalActions | TWsInternalActions;
//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

//export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

