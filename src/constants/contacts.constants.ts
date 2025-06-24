import { IContacts } from '@/types/interfaces/common.intefaces'

const env = import.meta.env

export const contacts: IContacts[] = [
	{
		name: 'tg',
		title: env.VITE_TG_URL ? `@${env.VITE_TG_URL}` : '',
		url: env.VITE_TG_URL ? `https://t.me/${env.VITE_TG_URL}` : '',
	},
	{
		name: 'github',
		title: env.VITE_GITHUB_URL || '',
		url: env.VITE_GITHUB_URL ? `https://github.com/${env.VITE_GITHUB_URL}` : '',
	},
	{
		name: 'gmail',
		title: env.VITE_GMAIL_URL || '',
		url: env.VITE_GMAIL_URL ? `mailto:${env.VITE_GMAIL_URL}` : '',
	},
]
