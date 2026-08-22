import { SignInForm } from '../../../features/auth/SignInForm';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
