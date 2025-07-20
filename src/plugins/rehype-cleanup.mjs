import { visit } from 'unist-util-visit'

/**
 * Rehype plugin to cleanup and extract raw figure elements from paragraph nodes
 */
export default function rehypeCleanup() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p') {
        return
      }
      if (!node.children?.length) {
        return
      }
      if (!parent) {
        return
      }

      const rawFigureNodes = []

      for (const child of node.children) {
        if (child.type === 'raw' && child.value && child.value.trim().startsWith('<figure')) {
          rawFigureNodes.push(child)
        } else if (child.type !== 'text' || child.value.trim() !== '') {
          return
        }
      }

      if (rawFigureNodes.length > 0) {
        parent.children.splice(index, 1, ...rawFigureNodes)
        return index
      }
    })
  }
}
