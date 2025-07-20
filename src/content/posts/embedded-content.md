---
title: 'Embedded Content'
pubDate: '2025-06-06'
---

Use these directives to embed media:

```
::link{url="https://xxxxx"}

::spotify{url="https://open.spotify.com/type/xxxxxx"}

::youtube{url="https://www.youtube.com/watch?v=xxxxxx"}

::bilibili{url="https://www.bilibili.com/video/xxxxxx"}

::github{repo="username/repo"}

::x{url="https://x.com/username/status/xxxxxx"}
```

```
🟡

When embedded content is still loading,
the table of contents positioning may be inaccurate.
```

## Link Card

::link{url="https://pitchfork.com/reviews/albums/ichiko-aoba-luminescent-creatures/"}

```
🟡

If you don’t need Link Card, you can skip adapter setup:

- Run「pnpm remove @astrojs/netlify」
- Delete the following content:
  - src/component/ui/LinkCard.astro
  - src/plugins/remark-embedded-media.mjs (Lines 8 - 32)
  - src/pages/api/proxy.ts
  - astro.config.ts (Lines 17 & 20)
```

## Spotify

::spotify{url="https://open.spotify.com/track/41Y0ch6R3jzpJOZv6nhf9Z?si=6c82dbed65ab4853"}

::spotify{url="https://open.spotify.com/album/1kBPEN3NIVwjdmIjjNk9vB?si=Lz29MvjwRnKX9y3dhxlbaQ"}

## YouTube

::youtube{url="https://www.youtube.com/embed/GlhV-OKHecI?si=KdB4rRPLAMEK-ozf"}

## BiliBili

::bilibili{url="https://www.bilibili.com/video/BV1Vm421W7pX/?vd_source=c0bc2746a6d2b23de50d26376498b2ff"}

## GitHub

::github{repo="the3ash/astro-chiri"}

## X Post

::x{url="https://x.com/DAVID_LYNCH/status/1174367510893752321"}
