import React, { useCallback, useMemo } from 'react';
import { useAddToCart } from '../../../shared/hooks/useAddToCart';
import { cartSelectors } from '../../../shared/store/slices/cart';
import { useAppSelector } from '../../../shared/store/utils';
import { Card } from '../../../shared/ui/Card/ui/Card';
import s from './CardList.module.css';

type CardListProps = {
	title: string;
	products: Product[];
};

const CardListComponent = React.memo(
	({ title, products }: CardListProps) => {
		const cartProducts = useAppSelector(cartSelectors.getCartProducts);
		const { addProductToCart } = useAddToCart();

		const cartProductIds = useMemo(() => {
			const ids = new Set<string>();
			cartProducts.forEach((p) => ids.add(p.id));
			return ids;
		}, [cartProducts]);

		const isProductInCart = useCallback(
			(id: string) => {
				return cartProductIds.has(id);
			},
			[cartProductIds]
		);

		if (!products.length) {
			return <h1 className='header-title'>Товар не найден</h1>;
		}

		return (
			<div className={s['card-list']}>
				<div className={s['card-list__header']}>
					<h2 className={s['card-list__title']}>{title}</h2>
				</div>
				<div className={s['card-list__items']}>
					{products.map((product) => (
						<Card
							key={product.id}
							product={product}
							isProductInCart={isProductInCart(product.id)}
							onAddToCart={addProductToCart}
						/>
					))}
				</div>
			</div>
		);
	},
	(prev, next) => prev.products === next.products && prev.title === next.title
);

CardListComponent.displayName = 'CardList';

export const CardList = CardListComponent;
