import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Dashboard from '@mui/icons-material/Dashboard'
import Timer from '@mui/icons-material/Timer'

function Sidebar() {
	return (
		<Box
			sx={{
				width: 300,
				py: '120px',
				bgcolor: (theme) => theme.palette.primary.light,
			}}
		>
			<List>
				<ListItem button>
					<ListItemIcon sx={{ color: (theme) => theme.palette.text.secondary }}>
						<Dashboard />
					</ListItemIcon>
					<ListItemText
						primary="Dashboard"
						sx={{ color: (theme) => theme.palette.text.secondary }}
					/>
				</ListItem>
				<ListItem button>
					<ListItemIcon sx={{ color: (theme) => theme.palette.text.secondary }}>
						<Timer />
					</ListItemIcon>
					<ListItemText primary="Timer" sx={{ color: (theme) => theme.palette.text.secondary }} />
				</ListItem>
			</List>
		</Box>
	)
}

export default Sidebar
