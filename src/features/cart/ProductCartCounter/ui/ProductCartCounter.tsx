import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useCount } from '../hooks/useCount';
import { useAddToCart } from '../../../../shared/hooks/useAddToCart';
import { Input } from '../../../../shared/ui';
import { memo, useCallback } from 'react';

type ProductCartCounterProps = {
	product: Product;
};

export const ProductCartCounter = memo(({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } = useCount();
	const { addProductToCart } = useAddToCart();

	const handleAddToCart = useCallback(() => {
		addProductToCart({ ...product, count });
	}, [addProductToCart, product, count]);

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s['button-count']}>
				<button className={s['button-count__minus']} onClick={handleCountMinus}>
					-
				</button>
				<Input
					type='number'
					className={s['button-count__num']}
					value={count}
					onChange={handleCount}
				/>
				<button className={s['button-count__plus']} onClick={handleCountPlus}>
					+
				</button>
			</div>
			<button
				onClick={handleAddToCart}
				className={classNames(s['button'], s['button_type_primary'])}>
				В корзину
			</button>
		</div>
	);
});
