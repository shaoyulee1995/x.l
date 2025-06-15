"use client"

import * as React from "react"
import { Search, Code, BookOpen, Github, ExternalLink, RefreshCw, AlertCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useLeetCodeProblems } from "@/hooks/use-leetcode-problems"
import type { LeetCodeProblem } from "@/types/leetcode"
import { cn } from "@/lib/utils"

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
  Unknown: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200",
  Interview: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200",
}

interface LeetCodeSidebarProps {
  selectedProblem?: string
  onProblemSelect?: (problem: LeetCodeProblem) => void
  className?: string
}

export function LeetCodeSidebar({ selectedProblem, onProblemSelect, className }: LeetCodeSidebarProps) {
  const { problems, loading, error, hasMore, searchQuery, loadMore, search, refreshProblems, totalCount, solvedCount } =
    useLeetCodeProblems()

  const [searchInput, setSearchInput] = React.useState("")

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      search(searchInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, search])

  // Handle scroll for infinite loading
  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

      // Load more when user scrolls to bottom
      if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
        loadMore()
      }
    },
    [hasMore, loading, loadMore],
  )

  const handleProblemClick = (problem: LeetCodeProblem) => {
    onProblemSelect?.(problem)
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <Code className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LeetCode Solutions
            </span>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {loading ? "Loading..." : `${solvedCount}/${totalCount} solved`}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshProblems}
            disabled={loading}
            className="ml-auto hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-center px-4 pb-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://github.com/shaoyulee1995/Problems/tree/main/LeetCode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="size-3" />
              View on GitHub
              <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            <BookOpen className="size-4" />
            Problems ({problems.length}
            {totalCount > problems.length ? `/${totalCount}` : ""})
          </div>

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-xs text-red-700 dark:text-red-300">
                {error}
                <Button
                  variant="link"
                  size="sm"
                  onClick={refreshProblems}
                  className="h-auto p-0 ml-2 text-xs text-red-600 hover:text-red-800"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <ScrollArea className="h-[calc(100vh-280px)]" onScrollCapture={handleScroll}>
            <div className="space-y-2">
              {problems.map((problem) => (
                <button
                  key={`${problem.folder}-${problem.id}`}
                  onClick={() => handleProblemClick(problem)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.02] dark:hover:bg-gray-800",
                    selectedProblem === problem.id
                      ? "bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/20"
                      : "bg-white dark:bg-gray-800",
                  )}
                >
                  <div className="flex items-center gap-2 w-full mb-2">
                    <span className="text-xs text-muted-foreground font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      #{problem.id}
                    </span>
                    <span className="font-medium text-sm truncate flex-1">{problem.title}</span>
                    {problem.solved && <div className="size-2 rounded-full bg-green-500 flex-shrink-0" />}
                  </div>

                  <div className="flex items-center gap-2 w-full mb-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs px-2 py-1 border ${difficultyColors[problem.difficulty]}`}
                    >
                      {problem.difficulty}
                    </Badge>

                    {problem.timeComplexity && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        {problem.timeComplexity}
                      </Badge>
                    )}

                    {problem.hasSQL && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-1 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300"
                      >
                        SQL
                      </Badge>
                    )}
                  </div>

                  {problem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 w-full">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700">
                          +{problem.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </button>
              ))}

              {loading && (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="size-5 animate-spin mr-3 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Loading problems...</span>
                </div>
              )}

              {hasMore && !loading && (
                <Button
                  variant="default"
                  onClick={loadMore}
                  className="w-full justify-center text-sm my-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  Load More Problems
                </Button>
              )}

              {!hasMore && problems.length > 0 && (
                <div className="text-center p-4 text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
                  🎉 All problems loaded
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
