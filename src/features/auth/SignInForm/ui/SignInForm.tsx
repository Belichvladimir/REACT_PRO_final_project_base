import { FC, useEffect, useRef } from 'react';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { SignInFormValues } from '../utils/types';
import { signInFormSchema } from '../utils/validator';
import { useSignInMutation } from '../../model/api/authApi';
import { userActions } from '../../../../shared/store/slices/user';
import { getMessageFromError } from '../../../../shared/utils';
import { Button, Input } from '../../../../shared/ui';
import { useAppDispatch } from '../../../../shared/store/utils';

export const SignInForm: FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [signInRequestFn] = useSignInMutation();

	const emailInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			const response = await signInRequestFn(values).unwrap();

			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);

			toast.success('Вы успешно авторизованы!');

			if (location.state?.from) {
				return navigate(location.state.from);
			}

			navigate('/');
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при авторизации пользователя'
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
					Sign In
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ my: 1 }}>
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
							{isSubmitting ? 'Загрузка...' : 'Sign IN'}
						</Button>
					</Box>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signup'>
							SIGN UP
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
