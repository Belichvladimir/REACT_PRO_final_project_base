import { Link } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg';
import s from './Logo.module.css';
import { memo } from 'react';

export const Logo = memo(() => {
	return (
		<Link to='/'>
			<img className={s['logo__pic']} src={LogoIcon} alt='Логотип компании' />
		</Link>
	);
});
