export enum LangEnum {
	EN = 'en',
	RU = 'ru',
	UK = 'uk',
}

export const getAvailableLangTitle = (lang: LangEnum): string => {
	switch (lang) {
		case LangEnum.RU:
			return 'RU'
		case LangEnum.EN:
			return 'EN'
		case LangEnum.UK:
			return 'UA'
		default:
			return ''
	}
}

export const getAvailableLangOptions = () => {
	return [
		{ name: getAvailableLangTitle(LangEnum.EN), value: LangEnum.EN },
		{ name: getAvailableLangTitle(LangEnum.RU), value: LangEnum.RU },
		{ name: getAvailableLangTitle(LangEnum.UK), value: LangEnum.UK },
	]
}
