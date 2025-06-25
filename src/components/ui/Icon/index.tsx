import { IconProps } from '@/types/props/IconProps'

export const Icon = ({ name, alt = '', className = '', size = 24 }: IconProps) => (
	<img
		src={`assets/icons/${name}.png`}
		alt={alt || name}
		class={`icon ${className} me-2 mb-2 rounded`}
		width={size}
		height={size}
		loading='lazy'
		draggable={false}
	/>
)
