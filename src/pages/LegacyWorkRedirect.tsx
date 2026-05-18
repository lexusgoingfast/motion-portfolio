import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCasePagePath, getProjectBySlug } from '../data/projects'

export default function LegacyWorkRedirect() {
  const { slug } = useParams<{ slug: string }>()
  useEffect(() => {
    const p = slug ? getProjectBySlug(slug) : undefined
    if (p) window.location.replace(getCasePagePath(p.slug))
    else window.location.replace('/')
  }, [slug])
  return null
}
