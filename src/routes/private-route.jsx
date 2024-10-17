import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
	const isAuthenticated =
		localStorage.getItem('ACCESS_TOKEN') ||
		sessionStorage.getItem('ACCESS_TOKEN');

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
