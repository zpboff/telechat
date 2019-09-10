import { observable, action, configure, computed } from 'mobx';
import { signupStep } from '../components/auth/signup/signupLogic';

configure({ enforceActions: 'always' });

class RegistrationModel {
	@observable email;
	@observable password;
	@observable passwordConfirmation;
	@observable birthdate;
	@observable firstName;
	@observable lastName;
	@observable step = signupStep.Credentials;

	@action
	setField = (field, value) => {
		this[field] = value;
	};

	@computed get isFistStep() {
		return this.step === signupStep.Credentials;
	}

	@action
	goTo = step => {
		this.step = step;
	};
}

const registrationModel = new RegistrationModel();

export default registrationModel;
