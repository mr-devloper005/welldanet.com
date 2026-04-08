import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Discover trusted listings',
  },
  footer: {
    tagline: 'Directory discovery, listings, and local insight',
  },
  hero: {
    badge: 'Directory & discovery',
    title: ['Find the right listing', 'in minutes—not hours.'],
    description:
      'Scan categories, compare listings, and jump into details with a layout built for directory browsing—not endless feeds.',
    primaryCta: {
      label: 'Explore listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Submit listing',
      href: '/create/listing',
    },
    searchPlaceholder: 'Search listings, categories, places, and more',
    focusLabel: 'Focus',
    featureCardBadge: 'featured rotation',
    featureCardTitle: 'Fresh listings shape what visitors see first.',
    featureCardDescription:
      'Trending and recommended rows stay visual and scannable while the rest of the platform keeps working as before.',
  },
  home: {
    metadata: {
      title: 'Listings, categories, and local discovery',
      description:
        'Browse a modern listing directory with categories, recommendations, and fast scanning across businesses and services.',
      openGraphTitle: 'Listings, categories, and local discovery',
      openGraphDescription:
        'Explore listings by category, save favorites locally, and move quickly from discovery to detail pages.',
      keywords: ['listings', 'business directory', 'local discovery', 'categories', 'submit listing'],
    },
    introBadge: 'Listing-first platform',
    introTitle: 'Built for scanning listings, categories, and clear next steps.',
    introParagraphs: [
      'This homepage foregrounds listings and category discovery so visitors can compare options, skim trust cues, and open detail pages without hunting through unrelated feeds.',
      'Everything here is tuned for a single job: helping people find the right local business and helping owners keep their listing accurate.',
      'Whether someone lands from search or a category link, the path stays short: browse, filter, open, contact or visit.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Trending and recommended listing rows for faster scanning.',
      'Category tabs and directory-style cards with clear metadata.',
      'Strong CTAs for exploring all listings and submitting new ones.',
      'Lightweight motion and CSS-first interactions for quick loads.',
    ],
    primaryLink: {
      label: 'All listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Submit a listing',
      href: '/create/listing',
    },
    listify: {
      trendingTitle: 'Trending listings',
      recommendedTitle: 'Recommended for you',
      directoriesTitle: 'Directory by category',
      promoText:
        'List your business where buyers already browse—clear categories, sharp cards, and a submission flow that stays familiar.',
      ctaText: 'Open the full directory or add your listing in a few steps.',
      footerText: 'Explore popular categories',
    },
  },
  cta: {
    badge: 'Grow your presence',
    title: 'Ready to list or explore more?',
    description:
      'Submit a listing to reach people browsing this directory, or continue exploring categories and curated rows.',
    primaryCta: {
      label: 'Submit listing',
      href: '/create/listing',
    },
    secondaryCta: {
      label: 'Explore listings',
      href: '/listings',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Business listings directory',
    description: 'Find local businesses and services by category—hours, maps, photos, and contact info in one place.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Local business listings',
    paragraphs: [
      'Browse businesses and services by category with clear hours, locations, photos, and contact details—built so visitors can compare options and open a listing in one click.',
      'Every card is a directory entry: structured fields instead of mixed feeds, so search and filters stay predictable whether someone is on a phone or desktop.',
      'Jump from the homepage into categories, scan recommended rows, or open the full directory when you want to search or narrow results further.',
    ],
    links: [
      { label: 'All listings', href: '/listings' },
      { label: 'Search', href: '/search' },
      { label: 'Help center', href: '/help' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open image sharing', href: '/image-sharing' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse image sharing', href: '/image-sharing' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
