import { useState } from 'react';
import { Button } from '../../components/buttons/primary-button';
import { Checkbox } from '../../components/inputs/checkbox';
import { Input } from '../../components/inputs/input';
import { getAxiosInstance } from '../../services/api/axios';
import './styles.scss';
import { API_ENDPOINTS } from '../../services/api/api-endpoints';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState('');
	const axiosInstance = getAxiosInstance();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			if (!email || !password) {
				setError('Please fill in all fields');
				setTimeout(() => {
					setError('');
				}, 3000);
				return;
			}
			const user = await axiosInstance.post(API_ENDPOINTS.login, {
				email,
				password,
			});

			if (rememberMe) {
				localStorage.setItem('ACCESS_TOKEN', user.data.accessToken);
			} else {
				sessionStorage.setItem('ACCESS_TOKEN', user.data.accessToken);
			}
			navigate('/movie-list');
		} catch (error) {
			setError(error.response.data.message);
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	};

	return (
		<div className='login-page'>
			<h1>Sign in</h1>
			<form action=''>
				<Input
					type='email'
					placeholder='Email'
					value={email}
					onChange={setEmail}
				/>
				<Input
					type='password'
					placeholder='Password'
					value={password}
					onChange={setPassword}
				/>
				<Checkbox
					label='Remember me'
					name='remember-me'
					checked={rememberMe}
					onChange={setRememberMe}
				/>
				{error && <span>{error}</span>}
				<Button onClick={handleSubmit} type='primary'>
					Sign in
				</Button>
			</form>
		</div>
	);
};
