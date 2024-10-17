import IconPlus from '../../assets/img/plus.svg';

export const IconButton = ({ icon, onClick, style }) => {
	return (
		<button
			type='button'
			className='icon-button'
			onClick={onClick}
			style={{ ...style }}
		>
			{icon === 'plus' && <img src={IconPlus} alt='' />}
		</button>
	);
};
