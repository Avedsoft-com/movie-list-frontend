import cn from 'classnames';
import './styles.scss';

export const Button = ({ children, type, style, onClick }) => {
	return (
		<button
			type='button'
			className={cn('btn', type)}
			onClick={onClick}
			style={{ ...style }}
		>
			{children}
		</button>
	);
};
