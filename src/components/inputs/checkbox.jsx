export const Checkbox = ({ label, name, checked, onChange }) => {
	return (
		<div className='checkbox-wrapper'>
			<input
				name={name}
				id={name}
				type='checkbox'
				checked={checked}
				onChange={() => onChange(!checked)}
			/>
			<label htmlFor={name}>{label}</label>
		</div>
	);
};
