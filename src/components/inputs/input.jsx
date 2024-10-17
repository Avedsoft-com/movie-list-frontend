import './styles.scss';

export const Input = ({ type, placeholder, value, onChange, style }) => {
	return (
		<div className='input-wrapper' style={style}>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
};
