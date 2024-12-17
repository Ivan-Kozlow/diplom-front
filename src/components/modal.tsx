import { FC } from 'react'

import { cn } from '../utils/styles'

type TypeProps = {
	text: string
	ButtonsRender: FC
	show: boolean
}

export const Modal: FC<TypeProps> = ({ text, ButtonsRender, show }) => {
	return (
		<div
			className={cn(
				'absolute top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-10 duration-300 ease-in-out opacity-100 pointer-events-auto',
				{
					'opacity-0 pointer-events-none': !show,
				}
			)}
		>
			<div
				className={cn(
					'w-max h-max bg-gray-700 p-4 rounded-lg flex flex-col gap-6 items-center justify-center translate-y-[-100%] duration-300 ease-in-out',
					{ 'translate-y-0': show }
				)}
			>
				<p>{text}</p>

				<ButtonsRender />
			</div>
		</div>
	)
}
