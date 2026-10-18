import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The v1 export notifies before its first animation frame creates the native
// renderer. Ignore that early notification; later updates must receive the
// renderer, its cleanup function and layer index (matching the resize handler).
// Apply this compatibility patch on sync as well so a fresh export retains it.
export function patchOpenRadiantPlayer(source) {
  return source.replace(
    'const n=f[r];f[r]=a.update(n.size,colors,n.metaballs)',
    'const n=f[r];n&&(f[r]=a.update(n.size,n,n.stop,r))',
  )
}

// v1 is the shared asset contract used by Open Radiant's HTML5 (Blog) export.
export async function syncOpenRadiant(source, destination) {
  const files = [
    'player.bundle.js',
    'index.css',
    'LICENSE.md',
    'assets/fonts/OFL.txt',
  ]

  // Check every source before updating the installed runtime.
  await Promise.all(files.map((file) => readFile(join(source, file))))
  for (const file of files) {
    const target = join(destination, file)
    await mkdir(dirname(target), { recursive: true })
    if (file === 'player.bundle.js') {
      await writeFile(
        target,
        patchOpenRadiantPlayer(await readFile(join(source, file), 'utf8')),
      )
    } else {
      await copyFile(join(source, file), target)
    }
  }
  return files.length
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const source = resolve(process.argv[2] ?? '../open-radiant')
  const destination = fileURLToPath(
    new URL('../public/blog-assets/open-radiant/v1/', import.meta.url),
  )
  try {
    const count = await syncOpenRadiant(source, destination)
    console.log(`Updated ${count} shared Open Radiant files in ${destination}`)
  } catch (error) {
    console.error(
      'Could not sync Open Radiant. Build its player first, then check the source path.',
    )
    console.error(error.message)
    process.exitCode = 1
  }
}
