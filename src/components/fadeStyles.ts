import type { CSSProperties } from 'react'
import type { TransitionStatus } from 'react-transition-group'

export const fadeTimeout = 340

export const fadeDelayForShow = 160

export const defaultStyle = {
	transition: `opacity 550ms ease-out`,
	opacity: 0,
}

export const transitionStyles: Record<TransitionStatus, CSSProperties> = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
	unmounted: { opacity: 0 },
}
