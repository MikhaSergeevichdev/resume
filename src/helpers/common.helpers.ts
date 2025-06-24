import html2pdf from 'html2pdf.js'
import { tryToExport } from '@/store/app.signals'
import { LangEnum } from '@/constants/app.constants'
import { lang } from '@/store/app.signals'

type ExportPDFOptions = {
	element: HTMLElement
	filename?: string
}

export const exportElementToPDF = ({ element, filename = 'document.pdf' }: ExportPDFOptions) => {
	if (!element) return
	const opt = {
		margin: 0,
		filename,
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: {
			scale: 2,
			useCORS: true,
		},
		jsPDF: {
			unit: 'pt',
			format: 'a4',
			orientation: 'portrait',
		},
	}

	Promise.resolve().then(() => {
		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.finally(() => {
				tryToExport.value = false
			})
	})
}

export const isEn = () => {
	return lang.value === LangEnum.EN
}

export const isUk = () => {
	return lang.value === LangEnum.UK
}

export const isRu = () => {
	return lang.value === LangEnum.RU
}
