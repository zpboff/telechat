export const signupStep = {
	Credentials: 1,
	Personal: 2,
};

const signupBodyProps = {
	[signupStep.Credentials]: ['email', 'password', 'passwordConfirmation'],
	[signupStep.Personal]: ['firstName', 'lastName'],
};

export const getProps = (step, model) => {
	const props = {};
	const propsList = signupBodyProps[step];
	propsList.forEach(x => {
		props[x] = model[x];
	});
	return props;
};
