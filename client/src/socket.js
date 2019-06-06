import io from 'socket.io-client';
import { ChatActions } from './constants/actions';
import { pitchIn, putAllNames, getOne } from './actions/chat';

const socket = io('http://localhost:8000');

const configureSocket = (dispatch) => {
	socket.on('connect', () => {
		console.log('connected');
	});

	socket.on('UPDATED_POT', (state) =>
		dispatch({ type: ChatActions.DELIVER_UPDATED_POT_TO_REDUCER, updatedPot: state })
	);

	socket.on('GUESS_WHO_PITCHED_IN', (name) => dispatch(pitchIn(name)));

	socket.on('CURRENT_POT', (pot) => dispatch({ type: ChatActions.CURRENT_POT_TO_REDUCER, pot }));

	socket.on('SEND_NAMES_TO_CLIENTS', (names) => dispatch(putAllNames(names)));

	socket.on('GUESS_WHO_GOT_ONE', (name) => dispatch(getOne(name)));

	return socket;
};

export const getCurrentPot = () => socket.emit('GET_CURRENT_POT');

export const sendNameToServer = (name) => socket.emit('SEND_NAME_TO_SERVER', name);

export const sendPitchInToServer = (name) => socket.emit('SOMEONE_PITCHED_IN', name);

export const sendGetOneToServer = (name) => socket.emit('SOMEONE_GOT_ONE', name);

export default configureSocket;
