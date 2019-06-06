import { ChatActions } from '../constants/actions';
import { sendNameToServer, sendPitchInToServer, sendGetOneToServer } from '../socket';

export const assignUserName = (name) => {
	sendNameToServer(name);
	return {
		type: ChatActions.ASSIGNED_USERNAME,
		name
	};
};

export const currentPot = (pot) => {
	return {
		type: ChatActions.CURRENT_POT_TO_REDUCER,
		pot
	}
}

export const putAllNames = (names) => {
	return {
		type: ChatActions.PUT_ALL_NAMES_TO_REDUCER,
		names
	};
};

export const getOne = (name) => {
	sendGetOneToServer(name);
	return {
		type: ChatActions.GET_ONE
	};
};

export const pitchIn = (name) => {
	sendPitchInToServer(name);
	return {
		type: ChatActions.PITCH_IN
	};
};

export const anotherOnePitchedIn = () => {
	return {
		type: ChatActions.ANOTHER_ONE_PITCHED_IN
	};
};