import { useState, useMemo, createContext, useLayoutEffect } from 'react'
import { Box, PaletteMode } from '@mui/material'

import getDesignTokens from './theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Sidebar from './components/sidebar'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [mode, setMode] = useState<PaletteMode>('light')

	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
			},
		}),
		[]
	)

	useLayoutEffect(() => {
		setMode(prefersDarkMode ? 'dark' : 'light')
	}, [prefersDarkMode])

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
					<Sidebar />
					<Box sx={{ flexGrow: 1, bgcolor: (theme) => theme.palette.primary.main }}>
						Container
						<button onClick={colorMode.toggleColorMode}>toggle </button>
					</Box>
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
