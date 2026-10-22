export interface ProjectImage {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface Stat {
  label: string
  value: string
}

export interface FlowStage {
  title: string
  detail?: string
  items?: string[]
}

export interface CaseStudy {
  tagline: string
  /** Honest notes shown above the case study (limits, synthetic data, simulated payments...). */
  notice?: { title: string; points: string[] }
  overview: string[]
  problem: string[]
  contribution: string[]
  features: string[]
  architecture: { caption: string; stages: FlowStage[]; columns: 3 | 4 }
  decisions: { title: string; body: string }[]
  challenges: { challenge: string; solution: string }[]
  metrics: Stat[]
  metricsNote?: string
  /** Renders the baseline-vs-model WAPE comparison (FORESIGHT only). */
  showWapeChart?: boolean
  gallery: ProjectImage[]
  limitations: string[]
  lessons: string[]
  next: string[]
}

export interface ProjectLinks {
  live?: string
  repo?: string
  api?: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  /** Makes clear whether the work was part of an internship or independent. */
  kind: string
  summary: string
  tech: string[]
  stats: Stat[]
  links: ProjectLinks
  image?: ProjectImage
  featured: boolean
  caseStudy?: CaseStudy
}

export interface Role {
  id: string
  title: string
  org: string
  period: string
  ongoing?: boolean
  mode?: string
  points: string[]
  projectSlug?: string
  projectLabel?: string
  certificateId?: string
  tags: string[]
}

export type CertificateGroup = 'Internship certificates' | 'Courses & assessments' | 'Job simulations'

export interface Certificate {
  id: string
  title: string
  issuer: string
  group: CertificateGroup
  /** Human-readable date or period, exactly as printed on the certificate. */
  dateText: string
  credential?: { label: string; value: string }
  verifyUrl?: string
  verifyLabel?: string
  note?: string
  image: string
  width: number
  height: number
  alt: string
}
