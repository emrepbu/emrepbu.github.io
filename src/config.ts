import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://emrepbu.github.io/',
  base: '/',
  title: 'blog',
  description: 'kisisel blog',
  author: 'emrepbu',
  lang: 'tr',
  ogLocale: 'tr_TR',
}

export const UI: Ui = {
  internalNavs: [],
  socialLinks: [
    {
      link: 'https://github.com/emrepbu',
      title: 'Github',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
  ],
  navBarLayout: {
    left: ['themeButton'],
    right: ['internalNavs', 'socialLinks', 'searchButton'],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: false,
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  githubView: {
    monorepos: [],
    mainLogoOverrides: [],
    subLogoMatches: [],
  },
}

/**
 * Configures whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
 */
export const FEATURES: Features = {
  share: [
    true,
    {
      twitter: [false, '@pbuemre'],
      mastodon: false,
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'hover',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
  slideEnterAnim: [true, { enterStep: 60 }],
}
