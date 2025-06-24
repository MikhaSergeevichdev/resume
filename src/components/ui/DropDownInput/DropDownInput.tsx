import { Signal } from '@preact/signals'
import { useState } from 'preact/hooks'
import { InputOptionsType } from '@/types/props/InputOptionsProps'
import './DropDownInput.scss'

type Direction = 'left' | 'right'

type DropdownSwitchInputProps<T> = {
	options: InputOptionsType<T>[]
	signal: Signal<T>
	direction?: Direction
}

export const DropDownInput = <T,>({
	options,
	signal,
	direction = 'left',
}: DropdownSwitchInputProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)

	const activeOption = options.find((opt) => opt.value === signal.value)

	const handleClick = (option: InputOptionsType<T>) => {
		if (option.value === signal.value) {
			setIsOpen((prev) => !prev)
		} else {
			signal.value = option.value
			setIsOpen(false)
		}
	}

	return (
		<div class={`dropdown-switch ${direction}`}>
			<button
				class='dropdown-switch__trigger'
				onClick={() => setIsOpen((prev) => !prev)}
				type='button'
				aria-haspopup='true'
				aria-expanded={isOpen}
			>
				{activeOption?.name}
			</button>

			{isOpen && (
				<div class='dropdown-switch__menu' role='menu'>
					{options.map((option) => (
						<div
							role='menuitem'
							tabIndex={0}
							class={`dropdown-switch__item ${signal.value === option.value ? 'active' : ''}`}
							onClick={() => handleClick(option)}
						>
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
