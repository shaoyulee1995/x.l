"use client"

import { useState, useEffect, useCallback } from "react"
import type { LeetCodeProblem } from "@/types/leetcode"

export function useLeetCodeProblems() {
  const [allProblems, setAllProblems] = useState<LeetCodeProblem[]>([])
  const [displayedProblems, setDisplayedProblems] = useState<LeetCodeProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const INITIAL_LOAD = 5
  const LOAD_MORE_COUNT = 10

  const fetchProblems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/leetcode")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const problems: LeetCodeProblem[] = await response.json()
      setAllProblems(problems)
      setDisplayedProblems(problems.slice(0, INITIAL_LOAD))
      setHasMore(problems.length > INITIAL_LOAD)

      console.log(`Loaded ${problems.length} problems, showing first ${Math.min(INITIAL_LOAD, problems.length)}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch problems"
      setError(errorMessage)
      console.error("Error fetching problems:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return

    const filteredProblems = searchQuery
      ? allProblems.filter(
          (problem) =>
            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      : allProblems

    const currentCount = displayedProblems.length
    const nextBatch = filteredProblems.slice(currentCount, currentCount + LOAD_MORE_COUNT)

    setDisplayedProblems((prev) => [...prev, ...nextBatch])
    setHasMore(currentCount + LOAD_MORE_COUNT < filteredProblems.length)
  }, [allProblems, displayedProblems.length, hasMore, loading, searchQuery])

  const search = useCallback(
    (query: string) => {
      setSearchQuery(query)

      if (!query.trim()) {
        setDisplayedProblems(allProblems.slice(0, INITIAL_LOAD))
        setHasMore(allProblems.length > INITIAL_LOAD)
        return
      }

      const filtered = allProblems.filter(
        (problem) =>
          problem.title.toLowerCase().includes(query.toLowerCase()) ||
          problem.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )

      setDisplayedProblems(filtered.slice(0, INITIAL_LOAD))
      setHasMore(filtered.length > INITIAL_LOAD)
    },
    [allProblems],
  )

  const refreshProblems = useCallback(() => {
    fetchProblems()
  }, [fetchProblems])

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  return {
    problems: displayedProblems,
    allProblems,
    loading,
    error,
    hasMore,
    searchQuery,
    loadMore,
    search,
    refreshProblems,
    totalCount: allProblems.length,
    solvedCount: allProblems.filter((p) => p.solved).length,
  }
}
