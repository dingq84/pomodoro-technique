import { Box, IconButton, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'

import useTimer from '../../hooks/useTimer'

export interface ClockProps {
	totalSeconds: number
	radius?: number
	color?: string
	finish: () => void
}

function Clock(props: ClockProps) {
	const { totalSeconds, finish, radius = 200, color = '#E3507A' } = props
	// 算出直徑、圓周長和一單位刻度
	const diameter = radius * 2
	const border = 10
	const circumference = Math.round((radius - border) * 2 * Math.PI)
	const scale = Math.round((circumference / totalSeconds) * 100) / 100

	const [dashoffset, setDashoffset] = useState(0)
	const callback = () => setDashoffset((prevDashoffset) => Math.max(prevDashoffset + scale, 0))
	const { currentSeconds, start, stop, mode } = useTimer({ totalSeconds, callback })

	useEffect(() => {
		setDashoffset(0)
	}, [totalSeconds])

	useEffect(() => {
		if (currentSeconds === 0) {
			finish()
		}
	}, [currentSeconds, finish])

	return (
		<Box sx={{ display: 'inline-block' }}>
			<Box sx={{ position: 'relative', mb: '30px' }}>
				<svg
					height={diameter}
					width={diameter}
					style={{
						transform: 'rotate(-90deg)',
					}}
				>
					<circle
						cx={radius}
						cy={radius}
						r={radius - 10}
						stroke="rgba(0, 0, 0, 0.2)"
						strokeWidth={border}
						fill="transparent"
					/>
					<circle
						style={{
							transition: 'stroke-dashoffset .5s',
						}}
						cx={radius}
						cy={radius}
						r={radius - 10}
						stroke={color}
						strokeWidth={border}
						fill="transparent"
						strokeDashoffset={dashoffset}
						strokeDasharray={circumference}
					/>
				</svg>
				<Typography
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						fontSize: '48px',
						color: (theme) => theme.palette.text.primary,
						fontWeight: 'bold',
					}}
				>
					{format(currentSeconds * 1000, 'mm:ss')}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{mode !== 'start' ? (
					<IconButton onClick={start}>
						<PlayCircleIcon
							sx={{ color: (theme) => theme.palette.text.primary, width: 50, height: 50 }}
						/>
					</IconButton>
				) : (
					<IconButton onClick={stop}>
						<PauseCircleIcon
							sx={{ color: (theme) => theme.palette.text.primary, width: 50, height: 50 }}
						/>
					</IconButton>
				)}
			</Box>
		</Box>
	)
}

export default Clock
