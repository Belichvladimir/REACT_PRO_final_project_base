import classNames from 'classnames';
import s from './Spinner.module.css';
import { memo } from 'react';

export const Spinner = memo(() => {
	return (
		<div className={classNames(s['wrapper'])}>
			<div className={classNames(s['loader'])}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
});
