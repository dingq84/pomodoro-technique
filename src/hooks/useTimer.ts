import { useRef, useEffect, useState } from 'react'

export interface TimerProps {
	totalSeconds: number
	interval?: number
	callback?: () => void
}

function useTimer(props: TimerProps) {
	const { totalSeconds, callback, interval = 1000 } = props
	// 目前執行幾次 timeout，用來修正誤差
	const count = useRef<number>(0)
	// 依據偏差，動態調整下次 timeout 時間
	const nextTime = useRef<number>(interval)
	const startTime = useRef(0)
	const timer = useRef<number>()
	// 在 closure 裡面無法取得最新的 state
	const currentSecondsPointer = useRef<number>(totalSeconds)
	const [currentSeconds, setCurrentSeconds] = useState(totalSeconds)

	useEffect(() => {
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	useEffect(() => {
		stop()
		setCurrentSeconds(totalSeconds)
	}, [totalSeconds])

	useEffect(() => {
		currentSecondsPointer.current = currentSeconds
	}, [currentSeconds])

	const start = (): void => {
		timer.current = window.setTimeout(() => {
			if (startTime.current === 0) {
				startTime.current = new Date().getTime()
			}

			const offset = new Date().getTime() - (startTime.current + count.current * interval)
			nextTime.current = Math.max(interval - offset, 0)
			count.current++
			setCurrentSeconds((previous) => previous - 1)

			if (callback) {
				callback()
			}

			if (currentSecondsPointer.current) {
				start()
			}
		}, nextTime.current)
	}

	const stop = (): void => {
		clearTimeout(timer.current)
		count.current = 0
		startTime.current = 0
	}

	return { start, stop, currentSeconds }
}

export default useTimer
