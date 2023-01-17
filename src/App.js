import { Provider } from "react-redux";
import "./App.css";
import store from "./lib/store";
import InboxScreen from "./components/InboxScreen";

function App() {
	return (
		// <div className="App">
		// 	<header className="App-header">
		// 		<img src={logo} className="App-logo" alt="logo" />
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<a
		// 			className="App-link"
		// 			href="https://reactjs.org"
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 		>
		// 			Learn React
		// 		</a>
		// 	</header>
		// </div>
		<Provider store={store}>
			<InboxScreen />
		</Provider>
	);
}

export default App;
