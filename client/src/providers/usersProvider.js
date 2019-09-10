import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';

export default class UsersProvider {
	static GetAll = callback => {
		ApiProvider.Get(`${ConnectionStrings.UsersApiUrl}/getall`, res => {
			const { users } = res.data;
			callback(users);
		});
	};
}
