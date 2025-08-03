import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'emrepbu',
  description: '',
  href: 'https://emrepbu.github.io',
  author: 'emrepbu',
  locale: 'tr-TR',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/emrepbu',
    label: 'GitHub',
  },
  {
    href: 'https://x.com/pbuemre',
    label: 'X',
  },
  {
    href: 'mailto:emreargana@icloud.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
