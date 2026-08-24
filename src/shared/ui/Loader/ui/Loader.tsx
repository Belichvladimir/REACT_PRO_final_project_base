import { FC, memo } from 'react';
import s from './Loader.module.css';
import classNames from 'classnames';

export interface LoaderProps {
	size?: 'sm' | 'md' | 'lg';
	fullScreen?: boolean;
}

const LoaderComponent = memo(
	({ size = 'md', fullScreen = false }: LoaderProps) => {
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
	}
);

LoaderComponent.displayName = 'Loader';

export const Loader: FC<LoaderProps> = LoaderComponent;
