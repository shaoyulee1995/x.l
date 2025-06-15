"use client"

import { useState } from "react"
import { Header } from "@/components/leetcode/header/header"
import { Sidebar } from "@/components/leetcode/sidebar/sidebar"
import { ContentArea } from "@/components/leetcode/content-area/content-area"
import type { Problem } from "@/types/leetcode"

export default function LeetCodeViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [problems, setProblems] = useState<Problem[]>();

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex">
        <Sidebar
          searchQuery={searchQuery}
          selectedProblem={selectedProblem?.id || null}
          onProblemSelect={handleProblemSelect}
          problems={problems}
        />
        {/* <ContentArea selectedProblem={selectedProblem} /> */}
      </div>
    </div>
  )
}
