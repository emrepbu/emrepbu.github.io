#!/usr/bin/env tsx

/**
 * Update theme from upstream repository
 * Usage: pnpm update-theme
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Check and set up the upstream remote repository
try {
  execSync('git remote get-url upstream', { stdio: 'ignore' })
} catch {
  execSync('git remote add upstream https://github.com/the3ash/astro-chiri.git', {
    stdio: 'inherit'
  })
}

// Update theme from upstream repository
try {
  execSync('git fetch upstream', { stdio: 'inherit' })

  const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
  execSync('git merge upstream/main --allow-unrelated-histories', { stdio: 'inherit' })
  const newCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()

  if (currentCommit === newCommit) {
    console.log('🤗 No updates available, already up to date')
  } else {
    console.log('✅ Theme updated')
  }
} catch (error) {
  // Check if there's a merge conflict
  const gitDirectory = execSync('git rev-parse --git-dir', { encoding: 'utf8' }).trim()
  const mergeHeadFile = path.join(gitDirectory, 'MERGE_HEAD')

  if (fs.existsSync(mergeHeadFile)) {
    console.log('⚠️ Update fetched with merge conflicts. Please resolve manually')
  } else {
    console.error('❌ Update failed:', error)
    process.exit(1)
  }
}
