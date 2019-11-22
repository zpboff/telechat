import axios from 'axios';

const logError = error => {
	console.log(`%c ${error}`, 'background: #222; color: #bada55');
};

export default class ApiProvider {
	static Get(url, callback) {
		axios
			.get(url)
			.then(res => {
				if (res.status === 200) {
					callback(res);
					return;
				}
				logError(res);
			})
			.catch(error => {
				logError(error);
			});
	}

	static Post(url, body, callback) {
		axios
			.post(url, body)
			.then(res => {
				if (res.status === 200) {
					callback(res);
					return;
				}
				logError(res);
			})
			.catch(error => {
				logError(error);
			});
	}
}
