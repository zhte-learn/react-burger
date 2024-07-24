import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { api } from '../../utils/api';
// import { useAppDispatch } from "../hooks";

export type TWsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  sendMessage?: ActionCreatorWithPayload<any>,
  onConnecting?: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onMessage: ActionCreatorWithPayload<any>,
  onError: ActionCreatorWithPayload<string>,
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
  wsActions: TWsActionTypes,
  withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
  return ({dispatch}) => {
    let socket: WebSocket | null;
    const {
      connect,
      disconnect,
      sendMessage,
      onOpen,
      onClose,
      onMessage,
      onError
    } = wsActions;

    // const dispatch = useAppDispatch();

    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      if(connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;

        socket.onopen = () => {
          dispatch(onOpen());
        }

        socket.onerror = () => {
          dispatch(onError("Error"));
        }

        socket.onclose = () => {
          dispatch(onClose());

          //check if connection was disconnected not by user
          if(isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        }

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            //check token
            if(withTokenRefresh && parsedData.message === 'Invalid or missing token') {
              api.refreshToken()
              .then(refreshData => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set("token", refreshData.accessToken.replace("Bearer ", ""));
              })
              .catch(error => {
                dispatch(onError((error as Error).message));
              });
              dispatch(disconnect());
              return;
            }
            dispatch(onMessage(parsedData));
          } catch(error) {
            dispatch(onError((error as Error).message));
          }
        }
      }

      if(socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch(error) {
          dispatch(onError((error as Error).message));
        }
      }

      if(socket && disconnect.match(action)) {
        //stop any attemp to reconnect if user ended connection
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    }
  }
}
