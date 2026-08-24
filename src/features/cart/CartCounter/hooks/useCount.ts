import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/utils';
import {
	cartActions,
	cartSelectors,
} from '../../../../shared/store/slices/cart';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);
	const product = products.find((p) => p.id === productId) as CartProduct;

	const { id, count, stock } = product;

	const handleIncrement = useCallback(() => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	}, [count, dispatch, id]);

	const handleDecrement = useCallback(() => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	}, [count, dispatch, id]);

	const handleSetCount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newCount = +e.target.value;
			const validCount =
				newCount > MAX_COUNT
					? MAX_COUNT
					: newCount < MIN_COUNT
					? MIN_COUNT
					: newCount;
			dispatch(cartActions.setCartProductCount({ id, count: validCount }));
		},
		[dispatch, id]
	);

	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
