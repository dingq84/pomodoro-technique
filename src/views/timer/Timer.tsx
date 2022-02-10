import { useState, useCallback, SyntheticEvent } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'

import Clock from '../../components/clock'
import data from '../../data/tasks.json'

type Value = {
	color: '#E3507A' | '#23E73C'
	totalSeconds: number
}

type Mode = 'work' | 'rest'

const config: Record<Mode, Value> = {
	work: {
		color: '#E3507A',
		totalSeconds: 60,
	},
	rest: {
		color: '#23E73C',
		totalSeconds: 10,
	},
}

interface FilmOptionType {
	label: string
	year: number
}

function TimerView() {
	const [mode, setMode] = useState<Mode>('work')
	const [task, setTask] = useState<FilmOptionType>()

	const toggle = useCallback((): void => {
		setMode((prevMode) => (prevMode === 'work' ? 'rest' : 'work'))
	}, [])

	const handleTaskChange = (_: SyntheticEvent, value: any): void => {
		setTask(value)
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'start' }}>
			<Clock {...config[mode]} finish={toggle} />
			{/* <button onClick={toggle}>click</button> */}

			<Autocomplete
				value={task}
				onChange={handleTaskChange}
				sx={{ maxWidth: 400, flexGrow: 1, ml: '50px' }}
				disableClearable
				options={data.tasks}
				renderOption={(props, option) => (
					<Box component="li" {...props} sx={{ color: (theme) => theme.palette.text.secondary }}>
						{option.label} ({option.year})
					</Box>
				)}
				renderInput={(params) => (
					<TextField {...params} label="The current task" variant="standard" />
				)}
			/>
		</Box>
	)
}

export default TimerView
