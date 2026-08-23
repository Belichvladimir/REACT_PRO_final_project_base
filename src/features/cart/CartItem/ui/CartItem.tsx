import { ReactComponent as TrashIcon } from '../../../../shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from './CartItem.module.css';
import classNames from 'classnames';
import { cartActions } from '../../../../shared/store/slices/cart';
import { Button } from '../../../../shared/ui';
import { CartCounter } from '../../CartCounter';
import { useAppDispatch } from '../../../../shared/store/utils';
import { memo, useCallback } from 'react';
import useConfirmDialog from '../../../../shared/hooks/useConfirmDialog';
import { Modal } from '../../../../shared/ui/Modal/Modal';

type CartItemProps = {
	product: CartProduct;
};

const CartItemComponent = memo(
	({ product }: CartItemProps) => {
		const dispatch = useAppDispatch();
		const { id, name, images, price, discount } = product;
		const {
			isDialogOpen,
			dialogConfig,
			showConfirmDialog,
			handleConfirm,
			handleCancel,
		} = useConfirmDialog();

		const handleClickDelete = useCallback(async () => {
			const confirmed = await showConfirmDialog({
				title: 'Удалить элемент?',
				description: 'Это действие необратимо.',
			});
			if (confirmed) {
				dispatch(cartActions.deleteCartProduct(id));
			}
		}, [showConfirmDialog, dispatch, id]);
		return (
			<>
				<div className={classNames(s['cart-item'])}>
					<div className={classNames(s['cart-item__desc'])}>
						<img
							src={images}
							alt={name}
							className={classNames(s['cart-item__image'])}
						/>

						<div
							style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
							<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
								<Link
									className={classNames(s['cart-item__title'])}
									to={`/products/${id}`}>
									<h2>{name}</h2>
								</Link>

								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<CartCounter productId={id} />

									<div className={classNames(s['cart-item__price'])}>
										<div
											className={classNames(s['price-big'], s['price-wrap'])}>
											<span
												className={classNames(
													s['price_old'],
													s['price_right']
												)}>
												{price}
											</span>
											<span
												className={classNames(s['price_discount'], s['price'])}>
												{price - discount}
											</span>
										</div>
									</div>
								</div>
								<Button
									variant='text'
									className={classNames(s['cart-item__bnt-trash'])}
									onClick={handleClickDelete}>
									<TrashIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>
				<Modal
					isOpen={isDialogOpen}
					config={dialogConfig}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			</>
		);
	},
	(prev, next) => prev.product.id === next.product.id
);

CartItemComponent.displayName = 'CartItem';

export const CartItem = CartItemComponent;
