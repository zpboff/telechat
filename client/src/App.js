import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getAName } from './usernames';
import SnackBarNotif from './SnackbarNotif';

class App extends Component {
	componentDidMount() {
		const { dispatch, assignUserName } = this.props;
		const name = getAName();
		getCurrentPot(dispatch);
		assignUserName(name);
		sendNameToServer(name);
	}

	render() {
		const { pot, name, names, snackbarIsOpen, mode, whoDidIt, anotherOnePitchedIn, getOne, pitchIn } = this.props;

		return (
			<Grid container justify="center">
				<Grid style={{ textAlign: 'center' }} item xs={12}>
					<h1>{pot}</h1>
				</Grid>
				<Grid style={{ textAlign: 'right', padding: '10px' }} item xs={6}>
					<Button onClick={pitchIn.bind(this, name)} variant="raised" color="primary">
						pitch in!
					</Button>
				</Grid>
				<Grid style={{ textAlign: 'left', padding: '10px' }} item xs={6}>
					<Button onClick={getOne.bind(this, name)} variant="raised" color="secondary">
						get one!
					</Button>
				</Grid>
				<Grid style={{ textAlign: 'center' }} item xs={12}>
					<div
						style={{
							height: '500px',
							textAlign: 'center',
							width: '300px',
							border: '1px solod black',
							display: 'inline-block'
						}}
					>
						Your assigned username is <span style={{ color: 'red' }}>{name}</span>
						<div style={{ padding: '10px' }}>
							Other members:
							{names.length <= 1 ? (
								<div style={{ color: 'red' }}>No other members yet</div>
							) : (
								names.map((member) => (
									<div style={{ display: name === member && 'none' }} key={member}>
										{member}
									</div>
								))
							)}
						</div>
					</div>
				</Grid>
				<SnackBarNotif
					mode={mode}
					closeSnackbar={anotherOnePitchedIn}
					name={whoDidIt}
					snackbarIsOpen={snackbarIsOpen}
				/>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	pot: state.chat.pot,
	name: state.chat.name,
	names: state.chat.names,
	snackbarIsOpen: state.chat.snackbarIsOpen,
	mode: state.chat.mode,
	whoDidIt: state.chat.whoDidIt
});

export default connect(mapStateToProps, {
	assignUserName,
	getOne,
	pitchIn,
	closeSnackbar
})(App);
