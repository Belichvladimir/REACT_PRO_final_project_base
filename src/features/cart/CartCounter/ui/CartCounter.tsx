import { Input } from '../../../../shared/ui';
import { useCount } from '../hooks/useCount';
import s from './CartCounter.module.css';
import classNames from 'classnames';
import { memo } from 'react';

type TCartCounter = {
	productId: string;
};

const CartCounterComponent = memo(({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<>
			<div className={classNames(s['button-count'])}>
				<button
					onClick={handleDecrement}
					className={classNames(s['button-count__minus'])}>
					-
				</button>
				<Input
					onChange={handleSetCount}
					type='number'
					className={classNames(s['button-count__num'])}
					value={count}
				/>
				<button
					onClick={handleIncrement}
					className={classNames(s['button-count__plus'])}
					disabled={count >= stock}>
					+
				</button>
			</div>
		</>
	);
});

CartCounterComponent.displayName = 'CartCounter';

export const CartCounter = CartCounterComponent;
