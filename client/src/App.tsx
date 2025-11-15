import { useState, useSyncExternalStore } from "react";
import { clientStore } from "./stores/clientStore";
const logoipsum = "/logoipsum-247.svg";

function App() {
	const [count, setCount] = useState(0);
	const { chatMessages } = useSyncExternalStore(clientStore.subscribe, clientStore.getSnapshot);
	console.log(chatMessages);

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
			<div className="container">
				<h1>Baseline</h1>
				<div className="card">
					<div className="card-body">
						This is some text within a card body.
						<div className="d-grid gap-2 col-6 mx-auto">
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => setCount(count => count + 1)}
							>
								count is {count}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
