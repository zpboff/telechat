export const signupStep = {
	Credentials: 1,
	Personal: 2,
};

const signupBodyProps = {
	[signupStep.Credentials]: ['email', 'password'],
	[signupStep.Personal]: ['firstName', 'lastName'],
};

export const getProps = (model) => {
	const props = {};
	const propsList = signupBodyProps[model.step];
	propsList.forEach(x => {
		props[x] = model[x];
	});
	return props;
};
