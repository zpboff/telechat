export function getMappedHook(name, hook) {
	return {
		name,
		hook,
	};
}

export function getInputChanger() {
	const hooks = {};
	const changer = {};

	Object.values(arguments).forEach(arg => {
		const { name } = arg;
		const [value, setValue] = arg.hook;
		hooks[name] = setValue;
		changer[name] = value;
	});

	const onChange = event => {
		const { name, value } = event.target;
		hooks[name](value);
	};

	return {
		...changer,
		onChange,
	};
}
