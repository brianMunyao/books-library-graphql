import './App.css';
import MainApp from './MainApp';
import { AppProvider } from './utils/AppProvider';

const App = () => {
	return (
		<AppProvider>
			<MainApp />
		</AppProvider>
	);
};

export default App;
