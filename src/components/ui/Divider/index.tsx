interface DividerProps {
	noMarginTop?: boolean
}

export const Divider = ({ noMarginTop = false }: DividerProps) => (
	<hr
		style={{
			height: '4px',
			width: '100%',
			borderBottom: '3px solid #673a86',
			margin: noMarginTop ? '0 0 8px 0' : '8px 0',
		}}
	/>
)
