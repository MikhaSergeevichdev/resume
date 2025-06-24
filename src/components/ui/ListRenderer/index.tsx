import { ListProp } from '@/types/props/ListProps'
import { t } from '@/i18n'
import './index.scss'

export interface ListRendererProps {
	list: ListProp[]
	isGrid?: boolean
}

export const ListRenderer = ({ list, isGrid = false }: ListRendererProps) => {
	const [header, ...items] = list

	return (
		<div class='list-renderer-wrapper'>
			{header.logo && <img src={header.logo} alt='Logo' class='list-renderer__logo' />}
			{header.title && (
				<h2 class='list-renderer__title f-size-20 f-color-label'>{t(header.title)}</h2>
			)}
			{header.subtitle && (
				<h2 class='list-renderer__title f-size-16 f-color-label'>{t(header.subtitle)}</h2>
			)}

			<ul class={`list-renderer ${isGrid ? 'list-grid' : ''}`}>
				{items.map((item, index) => (
					<li
						key={index}
						class='d-flex list-renderer__item f-size-16 f-color-text align-items-start gap-2'
					>
						{item.title && (
							<h3 class='list-renderer__item-title f-size-16 f-color-label'>{t(item.title)}:</h3>
						)}
						{item.text && (
							<ul class='list-renderer__item-text'>
								{item.text.map((text, idx) => (
									<li class='text-start'>{t(text)}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
