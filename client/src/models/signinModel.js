import { observable, action, configure } from 'mobx';

configure({enforceActions: 'always'});

class LoginModel {
	@observable email;
	@observable password;

	@action
	setField = (field, value) => {
		this[field] = value;
	};
}

const loginModel = new LoginModel()

export default loginModel;
