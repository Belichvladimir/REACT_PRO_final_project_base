import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from '../Price/ui/Price';
import { Link } from 'react-router-dom';
import { LikeButton } from '../../LikeButton';
import { Button } from '../../Button';
import { CartCounter } from '../../../../features/cart/CartCounter';

type CardProps = {
	product: Product;
	isProductInCart: boolean;
	onAddToCart: (cartProduct: CartProduct) => void;
};
export const Card = ({ product, isProductInCart, onAddToCart }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					onClick={() => onAddToCart({ ...product, count: 1 })}
					disabled={isProductInCart}
					variant='primary'
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</Button>
			)}
		</article>
	);
};
