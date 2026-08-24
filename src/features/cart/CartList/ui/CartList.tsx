import { memo } from 'react';
import { cartSelectors } from '../../../../shared/store/slices/cart';
import { useAppSelector } from '../../../../shared/store/utils';
import { CartItem } from '../../CartItem';
import s from './CartList.module.css';
import classNames from 'classnames';

const CartListComponent = memo(() => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} />
			))}
		</div>
	);
});

CartListComponent.displayName = 'CartList';

export const CartList = CartListComponent;
