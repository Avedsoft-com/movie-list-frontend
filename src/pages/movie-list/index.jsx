import { IconButton } from '../../components/buttons/icon-button';
import Placeholder from '../../assets/img/placeholder.png';
import './styles.scss';
import { getAxiosInstance } from '../../services/api/axios';
import { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/primary-button';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../services/api/api-endpoints';

export const MovieListPage = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const axiosInstance = getAxiosInstance();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axiosInstance.get(API_ENDPOINTS.movies);
				setMovies(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchMovies();
	}, []);

	const handleLogout = async () => {
		localStorage.removeItem('ACCESS_TOKEN');
		sessionStorage.removeItem('ACCESS_TOKEN');
		window.location.href = '/';
		try {
			const response = await axiosInstance.post(API_ENDPOINTS.logout);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{loading ? null : movies.length ? (
				<div className='movie-list'>
					<div className='movie-list__heading'>
						<div className='movie-list__heading-wrapper'>
							<h1>My movies</h1>
							<IconButton
								icon='plus'
								onClick={() => navigate('/create-movie')}
							/>
						</div>
						<a className='logout' onClick={handleLogout}>
							Logout
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
							>
								<g clipPath='url(#clip0_7_232)'>
									<path
										d='M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z'
										fill='white'
									/>
								</g>
								<defs>
									<clipPath id='clip0_7_232'>
										<rect width='32' height='32' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</a>
					</div>
					<div className='movie-list__wrapper'>
						{movies.map((movie) => (
							<div className='movie-list__item' key={movie?.id}>
								<img src={movie?.cover || Placeholder} alt='' />
								<div className='movie-list__item-info'>
									<h3>{movie?.title}</h3>
									<span>{movie?.year}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className='movie-list__empty'>
					<h2>Your movie list is empty</h2>
					<Button
						type='primary'
						style={{ maxWidth: '202px' }}
						onClick={() => navigate('/create-movie')}
					>
						Add a new movie
					</Button>
				</div>
			)}
		</>
	);
};
