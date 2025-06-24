import { lang } from '@/store/app.signals'
import ru from './ru.json'
import en from './en.json'
import uk from './uk.json'

const translations = {
	ru,
	en,
	uk,
}

export const t = (key: string): string => {
	const keys = key.split('.')
	let current: any = translations[lang.value]
	for (const k of keys) {
		current = current?.[k]
		if (current == null) return key
	}
	return current
}
