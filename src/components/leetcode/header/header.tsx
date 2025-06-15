"use client"
import { Search, Github, ExternalLink } from "lucide-react"
import styles from './header.module.css'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Left Section - Title */}
          <div className={styles.leftSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>LSY</span>
            </div>
            <h1 className={styles.title}>LeetCode Solutions</h1>
          </div>

          {/* Center Section - Search Bar */}
          <div className={styles.centerSection}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Right Section - GitHub Link */}
          <div className={styles.rightSection}>
            <a
              href="https://github.com/shaoyulee1995/Problems/tree/main/LeetCode"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
            >
              <Github className={styles.githubIcon} />
              GitHub
              <ExternalLink className={styles.externalIcon} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
