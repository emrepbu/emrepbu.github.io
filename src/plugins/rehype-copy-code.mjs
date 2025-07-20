import { visit } from 'unist-util-visit'

/**
 * Rehype plugin that adds copy button to code blocks for easy code copying functionality
 */
export default function rehypeCopyCode() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        if (!node.children || node.children.length === 0) {
          return
        }

        const codeElement = node.children.find((child) => child.tagName === 'code')
        if (!codeElement) {
          return
        }

        node.properties = node.properties || {}
        node.properties.className = node.properties.className || []
        node.properties.className.push('copy-code-block')

        const copyButton = {
          type: 'element',
          tagName: 'button',
          properties: {
            className: ['copy-button'],
            type: 'button',
            'aria-label': 'Copy code'
          },
          children: []
        }

        node.children.unshift(copyButton)
      }
    })
  }
}
