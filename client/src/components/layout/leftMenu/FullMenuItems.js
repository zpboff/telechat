import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { Badge } from '@material-ui/core';

export default function FullMenuItems() {
	return (
		<div>
			<ListItem button>
				<ListItemIcon>
					<PersonOutlineIcon />
				</ListItemIcon>
				<ListItemText primary="Профиль" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<Badge badgeContent={4} className='bage'>
						<MailIcon />
					</Badge>
				</ListItemIcon>
				<ListItemText primary="Диалоги" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Друзья" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
				<ListItemText primary="Настройки" />
			</ListItem>
		</div>
	);
}
