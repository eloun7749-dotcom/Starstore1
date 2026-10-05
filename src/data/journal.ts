export interface JournalPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  content: string[]
}

export const journalPosts: JournalPost[] = [
  {
    id: 'the-ritual-of-morning',
    title: 'The Ritual of Morning',
    excerpt: 'Why the first cup is never just about coffee. It is about the quiet permission to begin slowly.',
    category: 'Philosophy',
    date: 'October 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=80',
    content: [
      'There is a particular silence that belongs to early morning. Before the notifications, before the demands, before the world asks anything of you — there is the ritual.',
      'We believe coffee is not a beverage but a ceremony. The measuring of beans, the heating of water, the slow bloom of grounds releasing their gas — each step is an invitation to be present.',
      'In a culture that worships speed, choosing to slow down is a quiet act of rebellion. It is the decision to taste rather than consume, to savor rather than finish.',
      'This is why we roast in small batches. This is why we source with intention. Because the morning ritual deserves beans that were treated with the same care you bring to the cup.',
    ],
  },
  {
    id: 'origin-story-yirgacheffe',
    title: 'Origin Story: Yirgacheffe',
    excerpt: 'A journey to the misted highlands of Ethiopia, where coffee was born and still grows wild.',
    category: 'Origin',
    date: 'September 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&q=80',
    content: [
      'The road to Yirgacheffe winds through mountains that seem to breathe. At 2,100 meters, the air is thin and cool, and the coffee plants grow slowly, developing the dense, complex beans that make this region legendary.',
      'Here, coffee is not a crop. It is a heritage. The heirloom varietals grown in these hills are descendants of the original coffee plants that grew wild in these forests centuries ago.',
      'We met farmers who know each tree by name, who can tell you which slope gets the morning sun and which gets the afternoon shade. This intimacy with the land is something no industrial farm can replicate.',
      'When you drink our Ethiopian Dawn, you are tasting that landscape — the mist, the altitude, the generations of care. It is not just coffee. It is a place.',
    ],
  },
  {
    id: 'the-science-of-extraction',
    title: 'The Science of Extraction',
    excerpt: 'Understanding the chemistry behind a perfect cup — and why it matters more than you think.',
    category: 'Brewing',
    date: 'August 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=1200&q=80',
    content: [
      'Extraction is the fundamental act of coffee brewing. Hot water dissolves compounds from the ground coffee, and the balance of these compounds determines the flavor of your cup.',
      'Under-extract, and the coffee tastes sour and thin. Over-extract, and it becomes bitter and astringent. The goal is the sweet spot in between, where sweetness, acidity, and body exist in harmony.',
      'Grind size, water temperature, brew time, and ratio all play their part. A finer grind extracts faster; a coarser grind extracts slower. Water that is too hot will over-extract; too cool will under-extract.',
      'Understanding these variables gives you control. And control gives you the ability to make the same excellent cup, every morning, without thinking about it. That is the goal of the ritual.',
    ],
  },
  {
    id: 'sustainable-futures',
    title: 'Sustainable Futures',
    excerpt: 'How our purchasing decisions ripple outward to the communities that grow our coffee.',
    category: 'Sustainability',
    date: 'July 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=80',
    content: [
      'Every bag of coffee represents a chain of hands. From the farmer who tends the plants to the picker who harvests the cherries, from the mill worker who processes the beans to the roaster who coasts out the flavor.',
      'When we pay above fair trade prices, we are not being charitable. We are investing in the people who make our product possible. When farmers earn enough to reinvest in their land, the quality of the coffee improves.',
      'Sustainability is not a marketing term. It is a recognition that the future of coffee depends on the wellbeing of the people who grow it. If they cannot afford to continue, the coffee disappears.',
      'This is why we publish our prices. This is why we name our farmers. Because transparency is the only way to ensure that the beauty in your cup is not built on someone else\'s hardship.',
    ],
  },
]
