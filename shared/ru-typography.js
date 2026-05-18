const NBSP = '\u00A0'

const NBSP_AFTER = [
  'из-за', 'из-под', 'по-над', 'по-под',
  'в', 'во', 'без', 'до', 'из', 'к', 'ко', 'на', 'по', 'о', 'об', 'обо', 'от', 'при',
  'с', 'со', 'у', 'за', 'над', 'под', 'про', 'для',
  'и', 'а', 'но', 'или', 'ли', 'бы', 'же', 'что', 'как', 'это', 'то',
  'не', 'ни', 'уже', 'ещё', 'еще', 'если', 'чтобы', 'пока', 'когда', 'где', 'куда', 'откуда',
]

const NBSP_BEFORE = ['ли', 'бы', 'же', 'ль']

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const afterRe = new RegExp(
  `(^|[\\s${NBSP}(\\[\\{—–\\-«"'])(${NBSP_AFTER.map(esc).join('|')}) (?=[^\\s${NBSP}])`,
  'giu',
)

const beforeRe = new RegExp(
  `([^\\s${NBSP}]) (${NBSP_BEFORE.join('|')})(?=[\\s${NBSP}.,!?;:—–)\\]»"']|$)`,
  'giu',
)

export function bindRuTypography(text) {
  if (!text || !/[а-яё]/i.test(text)) return text
  return text.replace(afterRe, `$1$2${NBSP}`).replace(beforeRe, `$1${NBSP}$2`)
}

export function applyRuTypographyDeep(value) {
  if (typeof value === 'string') return bindRuTypography(value)
  if (Array.isArray(value)) return value.map(applyRuTypographyDeep)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, applyRuTypographyDeep(v)]),
    )
  }
  return value
}

export function bindRuTypographyHtml(html) {
  return html.replace(
    /(<(?:p|span|h1|h2|h3|li|figcaption)\b[^>]*>)([\s\S]*?)(<\/(?:p|span|h1|h2|h3|li|figcaption)>)/gi,
    (block, open, inner, close) => {
      if (!/[а-яё]/i.test(inner) || /<[a-z]/i.test(inner)) return block
      const fixed = inner.replace(/([^<>]+)/g, (chunk) => bindRuTypography(chunk))
      return open + fixed + close
    },
  )
}
