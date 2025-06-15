"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Clock, BarChart3, Code2, BookOpen, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LeetCodeProblem } from "@/types/leetcode"

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
  Unknown: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200",
  Interview: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200",
}

interface SolutionDisplayProps {
  selectedProblem: LeetCodeProblem | null
}

export function SolutionDisplay({ selectedProblem }: SolutionDisplayProps) {
  const [selectedTab, setSelectedTab] = React.useState("solution")

  if (!selectedProblem) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6">
          <span className="text-muted-foreground">Select a problem to view solution</span>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <Card className="relative p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-blue-500/25 hover:shadow-blue-500/40">
            <div className="text-center">
              <div className="relative mb-6">
                <FileText className="size-16 text-muted-foreground mx-auto" />
                <Sparkles className="size-6 text-blue-500 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                No Problem Selected
              </h3>
              <p className="text-muted-foreground">Choose a LeetCode problem from the sidebar to view its solution</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const formatMarkdownContent = (content: string) => {
    return content
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6 border border-gray-700 shadow-lg"><code class="text-sm font-mono">$2</code></pre>',
      )
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono border">$1</code>',
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-gray-900 dark:text-gray-100'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic text-gray-700 dark:text-gray-300'>$1</em>")
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-lg font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200 border-l-4 border-blue-500 pl-4">$1</h3>',
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-700 pb-2">$1</h2>',
      )
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-12 mb-8 text-gray-900 dark:text-gray-100">$1</h1>')
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-green-500 animate-pulse" />
          <span className="font-bold text-lg">{selectedProblem.title}</span>
          <Badge variant="secondary" className={`border ${difficultyColors[selectedProblem.difficulty]}`}>
            {selectedProblem.difficulty}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 transition-all duration-300 hover:scale-105"
          >
            <a
              href={`https://leetcode.com/problems/${selectedProblem.folder.replace(/^\d+-/, "")}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLink className="size-3" />
              LeetCode
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <a
              href={`https://github.com/shaoyulee1995/Problems/tree/main/LeetCode/${selectedProblem.folder}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Github className="size-3" />
              Source
            </a>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Problem Overview */}
          <Card className="relative p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-blue-500/25 hover:shadow-blue-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BookOpen className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
                Problem Overview
              </CardTitle>
              <CardDescription className="text-base">
                #{selectedProblem.id} - {selectedProblem.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                {selectedProblem.timeComplexity && (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
                    <Clock className="size-4 text-green-600" />
                    <span className="text-sm font-medium">Time: {selectedProblem.timeComplexity}</span>
                  </div>
                )}
                {selectedProblem.spaceComplexity && (
                  <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800">
                    <BarChart3 className="size-4 text-purple-600" />
                    <span className="text-sm font-medium">Space: {selectedProblem.spaceComplexity}</span>
                  </div>
                )}
                {selectedProblem.hasSQL && (
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Code2 className="size-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">SQL Problem</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Solution Content */}
          <Card className="relative p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-blue-500/25 hover:shadow-blue-500/40">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="solution"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <Code2 className="size-4" />
                  Solution
                </TabsTrigger>
                <TabsTrigger value="raw" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  Raw Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="solution" className="space-y-4 mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    {selectedProblem.readmeContent ? (
                      <div
                        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdownContent(selectedProblem.readmeContent),
                        }}
                      />
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="size-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg">No solution content available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raw" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="size-5" />
                      Raw README Content
                    </CardTitle>
                    <CardDescription>Original markdown content from GitHub</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm whitespace-pre-wrap border border-gray-700 shadow-inner">
                      {selectedProblem.readmeContent || "No content available"}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
