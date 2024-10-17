import './styles.scss';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FileUploadComponent } from '../../components/inputs/file-upload';
import { Button } from '../../components/buttons/primary-button';
import { Input } from '../../components/inputs/input';
import { getAxiosInstance } from '../../services/api/axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../components/buttons/icon-button';
import { API_ENDPOINTS } from '../../services/api/api-endpoints';

const fileTypes = ['JPG', 'PNG'];

export const CreateMoviePage = () => {
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState(null);
	const [title, setTitle] = useState('');
	const [year, setYear] = useState('');
	const [error, setError] = useState('');
	const axiosInstance = getAxiosInstance();
	const navigate = useNavigate();

	const handleUploadFile = (file) => {
		setFile(file);
		const url = URL.createObjectURL(file);
		setFileUrl(url);
		console.log('file', file);
	};

	const handlePaste = (event) => {
		const items = event.clipboardData.items;
		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf('image') !== -1) {
				const blob = items[i].getAsFile();
				const url = URL.createObjectURL(blob);
				setFile(blob);
				setFileUrl(url);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('paste', handlePaste);
		return () => {
			window.removeEventListener('paste', handlePaste);
		};
	}, []);

	const handleSubmit = async () => {
		if (!file || !title || !year) {
			setError('Please fill in all fields');
			setTimeout(() => {
				setError('');
			}, 3000);
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('title', title);
			formData.append('year', year);
			const response = await axiosInstance.post(API_ENDPOINTS.movies, formData);
			setFile(null);
			setTitle('');
			setYear('');
			setError('Movie created successfully');
			setTimeout(() => {
				setError('');
				navigate('/movie-list');
			}, 3000);
		} catch (error) {
			setError(error?.response?.data?.message);
			console.log(error);
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	};

	return (
		<div className='create-movie'>
			<h1>Create Movie</h1>
			<form>
				{!file ? (
					<FileUploader
						handleChange={handleUploadFile}
						name='file'
						types={fileTypes}
						label='Drop an image here'
						classes='file-uploader'
						children={<FileUploadComponent />}
					/>
				) : (
					<div className='uploaded-file'>
						<img src={fileUrl} alt='Uploaded' />
						<IconButton
							icon={'plus'}
							onClick={() => setFile(null)}
							style={{
								position: 'absolute',
								top: '-15px',
								right: '-15px',
								transform: 'rotate(-45deg)',
							}}
						/>
					</div>
				)}
				<div className='inputs-wrapper'>
					<Input
						type='text'
						placeholder='Title'
						value={title}
						onChange={setTitle}
						style={{ maxWidth: '362px' }}
					/>
					<Input
						type='text'
						placeholder='Publishing year'
						value={year}
						onChange={setYear}
						style={{ maxWidth: '216px' }}
					/>
					{error && <span>{error}</span>}
					<div className='btns-wrapper'>
						<Button
							type='secondary'
							style={{ maxWidth: '179px' }}
							onClick={() => navigate('/movie-list')}
						>
							Cancel
						</Button>
						<Button
							type='primary'
							style={{ maxWidth: '179px' }}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};
