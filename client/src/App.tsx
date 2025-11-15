import { useState, useSyncExternalStore } from "react";
import { chatStore } from "./stores/chatStore";
const logoipsum = "/logoipsum-247.svg";

export type ChatState = {
	chatMessages: string[];
};

function App() {
	const [messageInput, setMessageInput] = useState("");
	const { chatMessages } = useSyncExternalStore(chatStore.subscribe, chatStore.getSnapshot);

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src={logoipsum} alt="VTT App logo" width="30" height="24" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Features
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Pricing
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" aria-disabled="true">
									Disabled
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="responsive no-scroll">
				{chatMessages.map((message, idx) => (
					<div className="grid no-space" key={idx}>
						<article className="m8 s10">
							<div>{message}</div>
						</article>
					</div>
				))}
			</main>
			<footer className="fill fixed">
				<nav>
					<div className="field label border max">
						<input
							type="text"
							onChange={e => setMessageInput(e.target.value)}
							value={messageInput}
						/>
						<label>Enter new message</label>
					</div>
					<button
						className="circle extra"
						onClick={() => {
							if (messageInput.length === 0) {
								alert("Input a message first.");
								return;
							}
							chatStore.sendMessage({
								message: messageInput,
							});
							setMessageInput("");
						}}
					>
						<i>send</i>
					</button>
				</nav>
			</footer>
		</>
	);
}
export default App;
