import { socket } from './index';

const initialState = {
	pot: 0,
	snackbarIsOpen: false,
	name: null,
	names: [],
	mode: null,
	whoDidIt: null
};

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PITCH_IN':
			socket && socket.emit('UPDATE_POT', state);
			return { ...state, pot: ++state.pot, mode: 'pitch' };
		case 'GET_ONE':
			socket && socket.emit('UPDATE_POT', state);
			return { ...state, pot: --state.pot, mode: 'get' };
		case 'DELIVER_UPDATED_POT_TO_REDUCER':
			return { ...state, pot: action.updatedPot.pot };
		case 'CURRENT_POT_TO_REDUCER':
			return { ...state, pot: action.pot };
		case 'ASSIGNED_USERNAME':
			return { ...state, name: action.name };
		case 'PUT_ALL_NAMES_TO_REDUCER':
			return { ...state, names: action.names };
		case 'PICTHED_IN':
			return {
				...state,
				snackbarIsOpen: true,
				mode: 'pitch',
				whoDidIt: action.name
			};
		case 'GOT_ONE':
			return {
				...state,
				snackbarIsOpen: true,
				mode: 'get',
				whoDidIt: action.name
			};
		case 'ANOTHER_ONE_PITCHED_IN':
			return { ...state, snackbarIsOpen: false };
		default:
			return state;
	}
};

export default chatReducer;
