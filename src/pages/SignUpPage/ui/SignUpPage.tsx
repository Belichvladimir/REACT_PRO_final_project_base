import { SignUpForm } from '../../../features/auth/SignUpForm';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
