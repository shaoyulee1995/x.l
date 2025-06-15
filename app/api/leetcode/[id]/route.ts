import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // First, get the folder contents to find README.md
    const { data: folderContents } = await octokit.repos.getContent({
      owner: "shaoyulee1995",
      repo: "Problems",
      path: `LeetCode/${id}`,
      ref: "main",
    })

    // Find README.md file
    const readmeFile = Array.isArray(folderContents)
      ? folderContents.find((file) => file.name.toLowerCase() === "readme.md")
      : null

    if (!readmeFile || readmeFile.type !== "file") {
      return NextResponse.json({ error: "README.md not found" }, { status: 404 })
    }

    // Fetch the README content
    const { data: readmeData } = await octokit.repos.getContent({
      owner: "shaoyulee1995",
      repo: "Problems",
      path: readmeFile.path,
      ref: "main",
    })

    if ("content" in readmeData) {
      const content = Buffer.from(readmeData.content, "base64").toString("utf-8")

      return NextResponse.json({
        id,
        content,
        path: readmeFile.path,
        htmlUrl: readmeFile.html_url,
        lastModified: readmeData.sha,
      })
    }

    return NextResponse.json({ error: "Failed to decode content" }, { status: 500 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch problem content" }, { status: 500 })
  }
}
