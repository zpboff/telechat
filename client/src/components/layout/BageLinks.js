import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton, Badge } from '@material-ui/core';

export default function BageLinks() {
	return (
		<IconButton aria-label="Show 4 new mails" color="inherit">
			<Badge badgeContent={4} color="secondary">
				<MailIcon />
			</Badge>
		</IconButton>
	);
}
