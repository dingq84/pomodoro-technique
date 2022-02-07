import { Box } from '@mui/material'

function Sidebar() {
	return (
		<Box
			sx={{
				width: 300,
				height: 400,
				py: 120,
				bgcolor: (theme) => theme.palette.primary.light,
			}}
		>
			hello
		</Box>
	)
}

export default Sidebar
