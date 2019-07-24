import { observable, action, configure } from 'mobx';

configure({enforceActions: 'always'});

class RegistrationModel {
	@observable email;
	@observable password;
	@observable passwordConfirmation;
	@observable birthdate;
	@observable firstName;
	@observable lastName;

	@action
	setField = (field, value) => {
		this[field] = value;
	};
}

const registrationModel = new RegistrationModel()

export default registrationModel;
