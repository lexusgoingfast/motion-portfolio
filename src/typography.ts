import { applyRuTypographyDeep, bindRuTypography } from '../shared/ru-typography.js'

export { bindRuTypography, applyRuTypographyDeep }

export function typo(text: string, lang: 'ru' | 'en') {
  return lang === 'ru' ? bindRuTypography(text) : text
}
