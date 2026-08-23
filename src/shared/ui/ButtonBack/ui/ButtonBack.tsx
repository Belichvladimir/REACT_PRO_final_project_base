import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';
import { memo } from 'react';

export const ButtonBack = memo(() => {
	const navigate = useNavigate();
	return (
		<button onClick={() => navigate(-1)}>
			<BackSvg />
		</button>
	);
});
