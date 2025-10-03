import { Server } from "socket.io";

export interface ServerToClientEvents {
	getMessagesFromServer: (data: { messages: string[] }) => void;
}

export interface ClientToServerEvents {
	newMessageFromClient: (data: { message: string }) => void;
}

const chatMessages: string[] = [];

const io = new Server<ClientToServerEvents, ServerToClientEvents>({
	cors: {
		origin: "*",
	},
});

io.on("connection", socket => {
	socket.emit("getMessagesFromServer", { messages: chatMessages });

	socket.on("newMessageFromClient", ({ message }) => {
		chatMessages.push(message);
		io.emit("getMessagesFromServer", { messages: chatMessages });
	});
});

io.listen(3000);
