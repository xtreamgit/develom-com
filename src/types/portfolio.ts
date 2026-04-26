export interface Tag {
  id: number
  name: string
  slug: string
  color: string
}

export interface PortfolioProject {
  id: number
  title: string
  stack: string
  problem: string
  tags?: Tag[] | null
  flagship?: boolean | null
  demoUrl?: string | null
  status?: ('coming-soon' | 'live') | null
  order?: number | null
}
