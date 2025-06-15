import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function GET() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: "shaoyulee1995",
      repo: "Problems",
      path: "LeetCode",
      ref: "main",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        "If-None-Match": "",
      },
    })

    // Filter only directories and format the data
    const problems = Array.isArray(data)
      ? data
          .filter((item) => item.type === "dir")
          .map((item) => ({
            id: item.name,
            name: item.name,
            path: item.path,
            url: item.url,
            htmlUrl: item.html_url,
            title: formatTitle(item.name),
          }))
          .sort((a, b) => {
            const aNum = Number.parseInt(a.id) || 0
            const bNum = Number.parseInt(b.id) || 0
            return aNum - bNum
          })
      : []

    return NextResponse.json(problems)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch LeetCode problems" }, { status: 500 })
  }
}

function formatTitle(name: string): string {
  // Extract number and title from folder name like "1173" or "0001-two-sum"
  const match = name.match(/^(\d+)[-.]?\s*(.*)$/)
  if (match) {
    const [, number, title] = match
    if (title) {
      return `${number}. ${title.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    }
    return `${number}. Problem ${number}`
  }
  return name
}
