import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import classNames from 'classnames';
import { memo } from 'react';

type TLikeButtonProps = {
	isLike: boolean;
	toggleLike?: () => Promise<void>;
};

const LikeButtonComponent = memo(({ isLike, toggleLike }: TLikeButtonProps) => {
	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
});

LikeButtonComponent.displayName = 'LikeButton';

export const LikeButton = LikeButtonComponent;
