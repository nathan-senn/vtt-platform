import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "../../../server/src/server";
import { createClientStore } from "./createClientStore";
// this store was copied from: https://react.dev/reference/react/useSyncExternalStore

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://localhost:3000");

export const clientStore = createClientStore(
	{
		chatMessages: [] as string[],
	},
	mutate => ({
		sendMessage({ message }: { message: string }) {
			socket.emit("newMessageFromClient", {
				message,
			});
		},

		updateMessages({ messages }: { messages: string[] }) {
			mutate(draft => {
				draft.chatMessages = messages;
			});
		},
	})
);

socket.on("getMessagesFromServer", ({ messages }) => {
	// get messages from Server
	clientStore.updateMessages({ messages });
});
