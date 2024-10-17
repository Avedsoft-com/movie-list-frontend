import FileUploadIcon from '../../assets/img/file-upload.svg';

export const FileUploadComponent = () => {
	return (
		<div className='file-upload'>
			<img src={FileUploadIcon} alt='' />
			<p>Drop an image here</p>
		</div>
	);
};
