// Runs inside the exported player, before player.bundle.js initializes Elm/WebGL.
;(() => {
  const scene = window.jsGenScene
  if (Array.isArray(scene?.layers)) {
    const covers = scene.layers.filter(
      (layer) => layer.def === 'cover' && layer.visible !== 'hidden',
    )
    const unused = []
    if (!covers.some(({ model }) => model.logoShown !== false)) {
      unused.push('.logo-layer')
    }
    if (
      !covers.some(
        ({ model }) =>
          model.productShown !== false &&
          !model.heading?.trim() &&
          !model.subheading?.trim(),
      )
    ) {
      unused.push('.product-name-layer')
    }
    if (unused.length) {
      // Older players briefly render default SVGs before importing scene.js.
      // Prevent those background requests before Elm mounts its first view.
      const style = document.createElement('style')
      style.textContent = `${unused.join(', ')} { background-image: none !important; }`
      document.head.appendChild(style)
    }
  }
  if (
    new URLSearchParams(window.location.search).get('preview') === '1' &&
    scene?.size
  ) {
    const originalWidth = scene.size.v1
    const originalHeight = scene.size.v2
    const width = Math.min(originalWidth, window.innerWidth)
    const height = Math.min(originalHeight, window.innerHeight)
    scene.size = { v1: width, v2: height }
    scene.sizeRule = `viewport:${width}x${height}`
    for (const point of [scene.origin, scene.mouse]) {
      if (!point) continue
      point.v1 = Math.round((point.v1 * width) / originalWidth)
      point.v2 = Math.round((point.v2 * height) / originalHeight)
    }
  }

  if (window.parent === window) return

  // Suspend both Elm and renderer loops without throwing away their state.
  const requestFrame = window.requestAnimationFrame.bind(window)
  const cancelFrame = window.cancelAnimationFrame.bind(window)
  const pending = new Map()
  let nextId = 0
  let playing = true

  const schedule = (id, entry) => {
    entry.nativeId = requestFrame((time) => {
      entry.nativeId = null
      if (!playing) return
      pending.delete(id)
      entry.callback.call(window, time)
    })
  }

  window.requestAnimationFrame = (callback) => {
    const id = ++nextId
    const entry = { callback, nativeId: null }
    pending.set(id, entry)
    if (playing) schedule(id, entry)
    return id
  }

  window.cancelAnimationFrame = (id) => {
    const entry = pending.get(id)
    if (entry?.nativeId != null) cancelFrame(entry.nativeId)
    pending.delete(id)
  }

  window.addEventListener('message', (event) => {
    if (
      event.source !== window.parent ||
      event.data?.type !== 'blog-cover:visibility' ||
      typeof event.data.playing !== 'boolean' ||
      event.data.playing === playing
    )
      return

    playing = event.data.playing
    for (const [id, entry] of pending) {
      if (playing) schedule(id, entry)
      else if (entry.nativeId != null) {
        cancelFrame(entry.nativeId)
        entry.nativeId = null
      }
    }
  })
})()
