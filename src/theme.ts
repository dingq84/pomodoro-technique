import { PaletteMode } from '@mui/material'

import { ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string
			active: string
			warning: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string
			active?: string
			warning?: string
		}
	}
}

// declare module '@mui/material/styles/createPalette' {
// 	interface Palette {
// 		custom?: PaletteColorOptions
// 	}
// 	interface PaletteOptions {
// 		custom?: PaletteColorOptions
// 	}
// }

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
	palette: {
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#E9EDF7',
						light: '#fff',
					},
					status: {
						active: '#4318FF',
						warning: '#EE5D50',
					},
					text: {
						primary: '#2B3674',
						secondary: '#A3AED0',
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: '#17153A',
						light: '#201D47',
					},
					// secondary
					status: {
						active: '#53B9EA',
						warning: '#FF409A',
					},
					text: {
						primary: '#fff',
						secondary: '#6F6C99',
					},
			  }),
	},
})

export default getDesignTokens
