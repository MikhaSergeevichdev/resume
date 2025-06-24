import './index.scss'

const logosList = [
	'js.png',
	'ts.png',
	'vue.png',
	'react.png',
	'preact.png',
	'astro.png',
	'html.png',
	'css.png',
	'sass.png',
	'bootstrap.png',
	'tailwind.png',
	'vite.png',
	'git.png',
	'gitlab.png',
	'ex.png',
	'node.png',
	'figma.png',
]

export const Logos = () => {
	return (
		<div class='tech-logos'>
			{logosList.map((name) => (
				<img
					src={`/assets/logos/${name}`}
					alt={name.replace('.png', '')}
					class='tech-logos__item'
				/>
			))}
		</div>
	)
}
