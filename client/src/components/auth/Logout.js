import { useEffect } from 'react';
import withAuth from '../shared/wrappers/withAuth';
import { logout } from '../../providers/authProvider';
import { useSignin } from '../../context/auth/context';

function Logout() {
	const signinMethod = useSignin();

	useEffect(() => {
		logout(signinMethod);
	}, []);
	return null;
}

export default withAuth(Logout);
