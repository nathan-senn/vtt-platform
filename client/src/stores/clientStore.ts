import { io, Socket } from "socket.io-client";
import { create } from "mutative";
import type { ClientToServerEvents, ServerToClientEvents } from "../../../server/src/server";
// this store was copied from: https://react.dev/reference/react/useSyncExternalStore

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://localhost:3000");

socket.on("getMessagesFromServer", ({ messages }) => {
	// get messages from Server
	clientState = create(clientState, draft => {
		draft.chatMessages = messages;
	});

	emitChange();
});

export type ClientState = {
	chatMessages: string[];
};

let clientState: ClientState = {
	chatMessages: [],
};

let listeners: Array<() => void> = [];

export const clientStore = {
	addMessage({ message }: { message: string }) {
		socket.emit("newMessageFromClient", {
			message,
		});
	},

	subscribe(listener: () => void) {
		// called when the state of the store changes
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	},
	getSnapshot() {
		// returns the current state of the store
		return clientState;
	},
};

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}
