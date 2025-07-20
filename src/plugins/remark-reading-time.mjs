import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

/**
 * Remark plugin to calculate and add reading time information to markdown frontmatter
 */
export default function remarkReadingTime() {
  return function (tree, file) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    const minutes = Math.max(1, Math.round(readingTime.minutes))
    file.data.astro.frontmatter.minutesRead = `${minutes}min`
    file.data.astro.frontmatter.readingTime = {
      text: `${minutes}min`,
      minutes: minutes,
      time: readingTime.time,
      words: readingTime.words
    }
  }
}
