import { FC, memo } from 'react';
import s from './Loader.module.css';
import classNames from 'classnames';

export interface LoaderProps {
	size?: 'sm' | 'md' | 'lg';
	fullScreen?: boolean;
}

export const Loader: FC<LoaderProps> = memo(({
	size = 'md',
	fullScreen = false,
}) => {
	return (
		<div
			className={classNames(
				s['loader'],
				s[`loader_${size}`],
				fullScreen && s['loader_fullscreen']
			)}>
			<div className={s['loader__spinner']} />
		</div>
	);
});
