import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';
import { memo } from 'react';

const ButtonBackComponent = memo(() => {
	const navigate = useNavigate();
	return (
		<button onClick={() => navigate(-1)}>
			<BackSvg />
		</button>
	);
});

ButtonBackComponent.displayName = 'ButtonBack';

export const ButtonBack = ButtonBackComponent;
