import { createClient } from 'graphql-http';

import './App.css';
import { useEffect, useState } from 'react';

const client = createClient({
	url: 'http://localhost:4000/graphql',
});

function App() {
	const [data, setData] = useState<any>();

	useEffect(() => {
		client.subscribe(
			{
				query: '{hello}',
			},
			{
				next: (data) => setData(data),
				error: (err) => console.error(err),
				complete: () => console.log('completed'),
			}
		);
	}, []);

	return <div>{JSON.stringify(data)}</div>;
}

export default App;
