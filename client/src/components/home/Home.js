import React from 'react';
import Grid from '@material-ui/core/Grid';

export default (props) => {
	return (
		<div className="grow">
			<Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={3}>
				<Grid item xs={12}>
					Home
				</Grid>
			</Grid>
		</div>
	);
};
