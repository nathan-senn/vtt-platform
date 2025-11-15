import { create } from "mutative";
// this store was inspired from: https://react.dev/reference/react/useSyncExternalStore

export type MutationFunction<State> = (mutator: (draft: State) => void) => void;
export type ClientStoreReturn<State extends Record<PropertyKey, unknown>, Actions> = {
	subscribe: (listener: () => void) => () => void;
	getSnapshot: () => State;
	mutate: MutationFunction<State>;
} & Actions;

export function createClientStore<State extends Record<PropertyKey, unknown>, Actions>(
	state: State,
	actionDefinitons: (mutate: MutationFunction<State>) => Actions
): ClientStoreReturn<State, Actions> {
	let listeners: Array<() => void> = [];
	function emitChange() {
		for (const listener of listeners) {
			listener();
		}
	}

	function mutate(mutator: (draft: State) => void) {
		currentState = create(currentState, mutator);
		emitChange();
	}

	let currentState = state;
	const actions = actionDefinitons(mutate);

	return {
		...currentState,
		...actions,
		subscribe(listener: () => void) {
			// called when the state of the store changes
			listeners = [...listeners, listener];
			return () => {
				listeners = listeners.filter(l => l !== listener);
			};
		},
		getSnapshot() {
			// returns the current state of the store
			return currentState;
		},
		mutate,
	};
}

const chatStore = createClientStore(
	{
		chatMessages: ["a"] as string[],
	},
	mutate => ({
		addMessage({ message }: { message: string }) {
			mutate(draft => {
				draft.chatMessages.push(message);
			});
		},
	})
);

const { chatMessages } = chatStore.getSnapshot();
chatStore.subscribe(() => {
	console.log("Chat messages updated:", chatStore.getSnapshot().chatMessages);
});

chatStore.subscribe(() => {
	console.log("Chat messages updated 2:", chatStore.getSnapshot().chatMessages);
});

const val = chatStore.mutate(draft => {
	draft.chatMessages.push("new message");
});
chatStore.addMessage({ message: "Hello, World!" });
chatStore.addMessage({ message: "My message" });
// use cases:
// socket.io
//  - write on socket event
//  - subscribe to store changes and send updates to server
// react
//  - useSyncExternalStore to subscribe to store changes
//  - getSnapshot to get current state
//  - actions to mutate state
// pixi.js
//  - subscribe to store changes and update pixi objects
//  - getSnapshot to get current state
//  - actions to mutate state

// general:
// - mutate state immutably
// - define actions to mutate state
// - get current state
// - subscribe to state changes
