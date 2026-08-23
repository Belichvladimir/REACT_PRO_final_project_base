import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormValues } from '../utils/types';
import { signUpFormSchema } from '../utils/validator';
import { useSignUpMutation } from '../../model/api/authApi';
import { userActions } from '../../../../shared/store/slices/user';
import { Button, Input } from '../../../../shared/ui';
import { getMessageFromError } from '../../../../shared/utils';
import { useAppDispatch } from '../../../../shared/store/utils';

export const SignUpForm: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [signUpRequestFn] = useSignUpMutation();
	const emailInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();

			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);

			toast.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			console.log({ error });
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при регистрации пользователя'
				)
			);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ mt: 1 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								ref={emailInputRef}
								label='Email Address'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={errors.email?.message}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label='Password'
								type='password'
								error={errors.password?.message}
								fullWidth
								required
							/>
						)}
					/>

					<Box sx={{ marginTop: 12, marginBottom: 8 }}>
						<Button
							type='submit'
							disabled={isSubmitted && (!isValid || isSubmitting)}
							fullWidth
							variant='primary'>
							{isSubmitting ? 'Загрузка...' : 'Sign Up'}
						</Button>
					</Box>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signin'>
							SIGN IN
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
