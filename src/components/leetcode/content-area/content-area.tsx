"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, FileText, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Problem, ProblemContent } from "@/types/leetcode"

interface ContentAreaProps {
  selectedProblem: Problem | null
}

export function ContentArea({ selectedProblem }: ContentAreaProps) {
  const [content, setContent] = useState<ProblemContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedProblem) {
      setContent(null)
      return
    }

    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/leetcode/${selectedProblem.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch content")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [selectedProblem])

  if (!selectedProblem) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-auto">
        <Card className="p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-auto">
      <div className="p-6 h-full">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Problem Header */}
          <Card className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedProblem.title}</CardTitle>
                  <CardDescription className="text-base mt-2">Problem #{selectedProblem.id}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0"
                  >
                    <a
                      href={`https://leetcode.com/problems/${selectedProblem.name.replace(/^\d+-/, "")}/`}
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
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <a
                      href={selectedProblem.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="size-3" />
                      Source
                    </a>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Content */}
          <Card className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            {loading && (
              <div className="flex items-center justify-center p-12">
                <div className="flex items-center gap-3">
                  <Loader2 className="size-5 animate-spin text-blue-500" />
                  <span className="text-sm text-muted-foreground">Loading solution...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-6">
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              </div>
            )}

            {content && !loading && !error && (
              <Tabs defaultValue="solution" className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="solution" className="flex items-center gap-2">
                      <FileText className="size-4" />
                      Solution
                    </TabsTrigger>
                    <TabsTrigger value="raw">Raw Content</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="solution" className="p-6">
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdownContent(content.content),
                    }}
                  />
                </TabsContent>

                <TabsContent value="raw" className="p-6">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm whitespace-pre-wrap border border-gray-700">
                    {content.content}
                  </pre>
                </TabsContent>
              </Tabs>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
