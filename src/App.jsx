import { useRoutes } from 'react-router-dom';
import './App.scss';
import { LoginPage } from './pages/login';
import PrivateRoute from './routes/private-route';
import { MovieListPage } from './pages/movie-list';
import { CreateMoviePage } from './pages/create-movie';

function App() {
	let element = useRoutes([
		{ path: '/login', element: <LoginPage /> },
		{
			path: '/',
			element: <PrivateRoute />,
			children: [
				{ path: '/movie-list', element: <MovieListPage /> },
				{ path: '/create-movie', element: <CreateMoviePage /> },
			],
		},
	]);

	return (
		<>
			<main>
				<div className='container'>{element}</div>
			</main>
		</>
	);
}

export default App;
