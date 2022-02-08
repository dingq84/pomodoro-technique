import type { RouteObject } from 'react-router-dom'

import Default from '../layouts/default'
import Home from '../views/home'
import Timer from '../views/timer'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Default />,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/timer', element: <Timer /> },
		],
	},
]

export default routes
