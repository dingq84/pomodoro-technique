import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { AlertColor, Snackbar, Alert } from '@mui/material'

interface NotificationProps {
	title: string
	content: string | NotificationOptions
	level: AlertColor
	show: boolean
}

interface NotificationType extends NotificationProps {
	isSupport: boolean
}

const initialValue: NotificationProps = {
	title: '',
	content: '',
	level: 'info',
	show: false,
}

interface NotificationContextType {
	notification: NotificationType
	setNotification: (_: NotificationProps) => void
}

export const NotificationContext = createContext({} as NotificationContextType)

function NotificationComponent() {
	const { notification, setNotification } = useContext(NotificationContext)
	const { isSupport, title, content, show } = notification
	const [showWarning, setShowWarning] = useState(false)

	const reset = useCallback((): void => {
		setNotification(initialValue)
	}, [setNotification])

	useEffect(() => {
		if (show) {
			if (isSupport === false) {
				setShowWarning(true)
			} else {
				let option: NotificationOptions
				if (typeof content === 'string') {
					option = { body: content }
				} else {
					option = content
				}

				new Notification(title, option).onclose = reset
			}
		}
	}, [show, isSupport, content, title, reset])

	const handleClose = (): void => {
		setShowWarning(false)
		reset()
	}

	if (isSupport) {
		return null
	}

	return (
		<Snackbar open={showWarning} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<Alert onClose={handleClose} severity="warning">
				{/* 您並未開啟通知，可能會影響您的使用體驗 */}
				{content}
			</Alert>
		</Snackbar>
	)
}

function NotificationProvider(props: { children: any }) {
	const { children } = props
	const [value, setValue] = useState(initialValue)
	const [isSupport, setIsSupport] = useState(false)

	useEffect(() => {
		if (!window.Notification) {
			console.warn('瀏覽器並未支援')
			setValue({
				title: '通知',
				content: '您的瀏覽器尚未支援通知功能，可能會影響您的使用體驗',
				show: true,
				level: 'warning',
			})
			setIsSupport(false)
		} else {
			Notification.requestPermission().then(function (result) {
				switch (result) {
					case 'granted':
						setIsSupport(true)
						break
					default:
						setValue({
							title: '通知',
							content: '您的瀏覽器尚未支援通知功能，可能會影響您的使用體驗',
							show: true,
							level: 'warning',
						})
						setIsSupport(false)
				}
			})
		}
	}, [])

	return (
		<NotificationContext.Provider
			value={{ notification: { ...value, isSupport }, setNotification: setValue }}
		>
			{children}
			<NotificationComponent />
		</NotificationContext.Provider>
	)
}

export default NotificationProvider
