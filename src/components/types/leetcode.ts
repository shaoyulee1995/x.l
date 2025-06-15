export interface LeetCodeProblem {
  id: string
  title: string
  difficulty: string
  folder: string
  solved: boolean
  tags: string[]
  timeComplexity?: string
  spaceComplexity?: string
  hasSQL?: boolean
  url: string
  htmlUrl: string
  readmeContent?: string
}

export interface Problem {
  id: string
  name: string
  path: string
  url: string
  htmlUrl: string
  title: string
}

export interface ProblemContent {
  id: string
  content: string
  path: string
  htmlUrl: string
  lastModified: string
}
