"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import type { Problem } from "@/types/leetcode"
import { cn } from "@/lib/utils"

interface SidebarProps {
  searchQuery: string
  selectedProblem: string | null
  onProblemSelect: (problem: Problem) => void
  problems: Problem[]
}

export function Sidebar({ searchQuery, selectedProblem, onProblemSelect, problems }: SidebarProps) {
  const [loading, setLoading] = useState(true)

  // Loading state - centered
  if (loading) {
    return (
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-blue-500" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Loading Problems</p>
            <p className="text-xs text-muted-foreground mt-1">Fetching from GitHub...</p>
          </div>
        </div>
      </div>
    )
  }

  // No problems found state - centered
  if (problems.length === 0) {
    return (
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">No Problems Found</h3>
            <p className="text-xs text-muted-foreground">No LeetCode problems were found in the repository.</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredProblems = problems.filter(
    (problem) => problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || problem.id.includes(searchQuery),
  )
  // No filtered results state - centered
  if (filteredProblems.length === 0 && searchQuery) {
    return (
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Problems</h2>
            <Badge variant="secondary" className="text-xs">
              {problems.length}
            </Badge>
          </div>
        </div>

        {/* No search results */}
        <div className="flex items-center justify-center h-[calc(100vh-8.5rem)]">
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">No Results Found</h3>
              <p className="text-xs text-muted-foreground">
                No problems match "{searchQuery}". Try a different search term.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Normal state with problems
  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Problems</h2>
          <Badge variant="secondary" className="text-xs">
            {filteredProblems.length}
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-8.5rem)]">
        <div className="p-2 space-y-1">
          {filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => onProblemSelect(problem)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm dark:hover:bg-gray-800",
                selectedProblem === problem.id
                  ? "bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/20"
                  : "bg-white dark:bg-gray-800",
              )}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono">
                  #{problem.id}
                </Badge>
                <span className="font-medium text-sm truncate flex-1">{problem.title}</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
