import s from './ProfilePage.module.css';
import classNames from 'classnames';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

export const ProfilePage = WithProtection(() => {
	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])}>
				<div className={s['form__row']}>
					<Input
						name='name'
						id='name'
						type='text'
						placeholder='Введите ваше имя'
						className={s['input']}
					/>
					<Input
						name='about'
						id='about'
						type='text'
						placeholder='Описание профессии'
						className={s['input']}
					/>
				</div>
				<div className={s['form__row']}>
					<Input
						name='avatar'
						id='avatar'
						type='url'
						placeholder='Введите ссылку на аватарку'
						className={s['input']}
					/>
					<Input
						name='email'
						id='email'
						type='text'
						placeholder='email'
						className={s['input']}
					/>
				</div>

				<Button
					type='submit'
					className={classNames(
						s['form__btn'],
						s['secondary'],
						s['maxContent']
					)}>
					Сохранить
				</Button>
			</form>
			<h2 className={s['form__title']}>Изменить пароль</h2>
			<form className={classNames(s['form'], s['form'])}>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<Input
						name='password'
						id='password'
						type='password'
						placeholder='Пароль'
						className={s['input']}
					/>
				</div>
				<Button
					type='submit'
					className={classNames(
						s['form__btn'],
						s['secondary'],
						s['maxContent']
					)}>
					Сохранить
				</Button>
			</form>
		</>
	);
});
