import vi from './lang/vi'
import en from './lang/en'
import { I18nType } from '@/typings/system'

const locales: Record<I18nType.LangType, I18nType.Schema> = {
  en,
  vi,
}

export default locales
