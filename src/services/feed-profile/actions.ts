import { createAction } from "@reduxjs/toolkit";

export const wsConnectAuth = createAction<string, "FEED_PROFILE_CONNECT">("FEED_PROFILE_CONNECT");
export const wsDisconnectAuth = createAction("FEED_PROFILE_DISCONNECT");

export type TWsExternalActions = ReturnType<typeof wsConnectAuth> | ReturnType<typeof wsDisconnectAuth>;
