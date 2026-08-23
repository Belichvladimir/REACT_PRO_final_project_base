import s from './ProfilePage.module.css';
import classNames from 'classnames';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface IRes {
	ok?: boolean;
}

export const ProfilePage = WithProtection(() => {
	const [status, submit, isPending] = useActionState(async () => {
		const res: IRes = await new Promise((resolve) =>
			setTimeout(() => resolve({ ok: true }), 1000)
		);
		return res.ok ? 'success' : 'error';
	}, 'idle');

	useEffect(() => {
		if (status === 'success') {
			toast.success('Вы успешно обновили свои данные!');
		}
		if (status === 'error') {
			toast.error('При обновлении данных произошла ошибка!');
		}
	}, [status]);

	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])} action={submit}>
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
					disabled={isPending}
					className={classNames(
						s['form__btn'],
						s['secondary'],
						s['maxContent']
					)}>
					{isPending ? 'Сохранение' : 'Сохранить'}
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
