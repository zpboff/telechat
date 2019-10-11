import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';

export default class ChatsProvider {
	static GetChatList = callback => {
		ApiProvider.Get(`${ConnectionStrings.ChatApiUrl}/getchatlist`, res => {
			const { chatList } = res.data;
			callback(chatList);
		});
	};
}
