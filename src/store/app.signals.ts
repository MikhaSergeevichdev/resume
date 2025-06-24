import { signal } from '@preact/signals'
import { LangEnum } from '@/constants/app.constants'

export const lang = signal<LangEnum>(LangEnum.EN)
export const tryToExport = signal<boolean>(false)
