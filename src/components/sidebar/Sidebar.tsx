import { Link } from 'react-router-dom'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dashboard from '@mui/icons-material/Dashboard'
import Timer from '@mui/icons-material/Timer'

const StyledLink = styled(Link)`
	text-decoration: none;
`

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
				<StyledLink to="/">
					<ListItem button>
						<ListItemIcon sx={{ color: (theme) => theme.palette.text.secondary }}>
							<Dashboard />
						</ListItemIcon>
						<ListItemText
							primary="Dashboard"
							sx={{ color: (theme) => theme.palette.text.secondary }}
						/>
					</ListItem>
				</StyledLink>
				<StyledLink to="/timer">
					<ListItem button>
						<ListItemIcon sx={{ color: (theme) => theme.palette.text.secondary }}>
							<Timer />
						</ListItemIcon>
						<ListItemText primary="Timer" sx={{ color: (theme) => theme.palette.text.secondary }} />
					</ListItem>
				</StyledLink>
			</List>
		</Box>
	)
}

export default Sidebar
