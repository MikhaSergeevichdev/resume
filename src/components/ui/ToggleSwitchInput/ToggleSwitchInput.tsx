import { Signal } from '@preact/signals'
import { InputOptionsType } from '@/types/props/InputOptionsProps'
import './ToggleSwitchInput.scss'

type ToggleSwitchGroupProps<T> = {
	options: InputOptionsType<T>[]
	signal: Signal<T>
}

export const ToggleSwitchInput = <T,>({ options, signal }: ToggleSwitchGroupProps<T>) => {
	const activeIndex = options.findIndex((option) => option.value === signal.value)
	const percent = 100 / options.length

	return (
		<div class='toggle__switch'>
			<div
				class='toggle__thumb'
				data-index={activeIndex}
				style={{
					width: `${percent}%`,
					transform: `translateX(${activeIndex * 100}%)`,
				}}
			/>
			{options.map((option) => (
				<label
					class={`toggle__option ${signal.value === option.value ? 'active' : ''}`}
					style={{
						width: `${percent}%`,
					}}
				>
					<input
						type='radio'
						class='visually-hidden'
						name='toggle-switch'
						value={String(option.value)}
						checked={signal.value === option.value}
						onChange={() => (signal.value = option.value)}
					/>
					{option.name}
				</label>
			))}
		</div>
	)
}
