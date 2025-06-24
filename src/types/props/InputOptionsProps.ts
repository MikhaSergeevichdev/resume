export interface InputOptionsProps<T> {
	options: InputOptionsType<T>[]
	onSelect: (value: T) => void
	placeholder?: InputOptionsType<T>
	label?: string
	containerClass?: string
	inputClass?: string
	optionsListClass?: string
	optionsItemClass?: string
	icons?: boolean
	disabled?: boolean
}

export interface InputOptionsType<T> {
	name: string
	value: T
	description?: string
	icon?: string
}
