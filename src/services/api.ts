// src/lib/api.ts

export type ContentBlock = 
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; caption?: string; alt?: string }
  | { type: 'gallery'; images: { url: string; caption?: string }[] };


export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  summary: string;
  category: string;
  date: string;
  content: ContentBlock[];
}

export interface ArticleSummaryDTO {
  slug: string;
  title: string;
  summary: string;
  author: string;
}

export async function getArticleSummary(slug: string): Promise<ArticleSummaryDTO | undefined> {
  // Eventually: return supabase.from('posts').select('*').eq('slug', slug).single();
  
  const MOCK_DATA: ArticleSummaryDTO[] = [
    { slug: 'indigoos-review', 
        title: 'Best Coffee in Plano', 
        summary: 'This is raw data being handled by the engine.', 
        author: 'Luis' 
      }
  ];
  
  return MOCK_DATA.find(post => post.slug === slug);
}

export async function getArticle(slug: string): Promise<ArticleSummaryDTO | undefined> {
  // Eventually: return supabase.from('posts').select('*').eq('slug', slug).single();
const MOCK_DATA: Article[] = [
    
  {
      id: '1',
      slug: 'indigoos-review',
      title: 'The IndigoOS Vision',
      author: 'Luis Alarcon',
      category: 'Tech',
      summary: 'Exploring the new system architecture for our creative platform.',
      date: 'Jan 31, 2026',
      content: [
        { type: 'text', value: 'The intersection of software and soul is where IndigoOS lives.' },
        { 
          type: 'image', 
          url: '', 
          caption: 'Early architecture sketches, 2026.' 
        },
        { type: 'text', value: 'We wanted to build something that felt less like a tool and more like an extension of the creative mind.' },
        {
          type: 'gallery',
          images: [
            { url: '' },
            { url: '' }
          ]
        }
      ]
    }, 
      {
      id: '2',
      slug: 'candid-aesthetic',
      title: 'Analog Revival',
      author: 'Photography Dept',
      category: 'Art',
      summary: 'Why we are returning to cinematic candid photography this semester.',
      date: 'Jan 30, 2026',
      content: []
    },
    {
  id: '3',
  slug: 'covet',
  title: 'Covet',
  author: 'Joanna Virippil',
  category: 'Editorial',
  summary: 'An exploration of shared light, stolen identity, and the weight of adornment.',
  date: 'Feb 4, 2026',
  content: [
    { type: 'image', url: '../assets/article photos/covet/cereal-1.jpg', alt: 'Title image' },
    { type: 'text', value: 'Greeting in open arms. The same familiar smile between us. Your light and mine. Woven tightly as threads. No beginning no end. We exchanged secrets, glances. Like they were nothing. But meant everything. Mine feeling more a choker. Dread creeps out from the light.' },
    { type: 'image', url: '../assets/article photos/covet/cereal-2.jpg', alt: 'Cereal spread' },
    { type: 'image', url: '../assets/article photos/covet/12-beforeFlick.jpg', alt: 'Two friends sharing a secret' },
    { type: 'image', url: '../assets/article photos/covet/text2.png', alt: 'Textual overlay' },
    { type: 'text', value: 'Idiosyncrasy that was left unnoticed. Subtle discord treads the air. If our hearts are truly united, why is your light brighter? Stronger, Sharper, Better.' },
    { type: 'image', url: '../assets/article photos/covet/11-flick.jpg', alt: 'Jewelry flick caught in motion' },
    { type: 'text', value: 'You point out my necklace, clutching tightly at your own. Your pristine, polished nails clawing at my nape. You\'re the same as me aren’t you? Bracelets slip, tangled between wrists.' },
    { type: 'image', url: '../assets/article photos/covet/8-final.jpg', alt: 'Coat and shoes swapped between friends' },
    { type: 'image', url: '../assets/article photos/covet/text.png', alt: 'Narrative graphic' },
    { type: 'text', value: 'Your coat draped over me, a conquest. My shoes on your feet, stomping out my shadow.' },
    { type: 'image', url: '../assets/article photos/covet/6-hair.jpg', alt: 'Jewelry being adjusted in hair' },
    { type: 'text', value: 'I drape your shawl across my shoulders. You slip my earrings into your ears. Each exchange a theft, a gift, a wound. Shadows lengthen in our laughter.' },
    { type: 'text', value: 'We struggle to escape from each other. Left in a disgraceful manner. I tore my gaze away and fell silent. I\'ve become lost in my feelings... how pathetic.' },
    { type: 'image', url: '../assets/article photos/covet/5-final.jpg' },
    { type: 'text', value: 'Gilded strangers in borrowed skins. When your jewels glitter on my hands and mine sparkle against your throat, we do not soften. We stare. Jealous still, hungry still, clothed in each other’s stolen light.' },
    {
      type: 'gallery',
      images: [
        { url: '../assets/article photos/covet/3-punch.jpg' },
        { url: '../assets/article photos/covet/4-punch.jpg' },
        { url: '../assets/article photos/covet/DILC.png' }
      ]
    }
  ]
},



];
  
  return MOCK_DATA.find(post => post.slug === slug);
}

export async function getAllArticlePosts() {
  // Eventually: return supabase.from('posts').select('*').order('date', { ascending: false });
  const MOCK_DATA = [
    {

      slug: 'indigoos-review',
      title: 'The IndigoOS Vision',
      author: 'Luis Alarcon',
      category: 'Tech',
      summary: 'Exploring the new system architecture for our creative platform.',
      date: 'Jan 31, 2026',
      content: [
        { type: 'text', value: 'The intersection of software and soul is where IndigoOS lives.' },
        { 
          type: 'image', 
          url: '', 
          caption: 'Early architecture sketches, 2026.' 
        },
        { type: 'text', value: 'We wanted to build something that felt less like a tool and more like an extension of the creative mind.' },
        {
          type: 'gallery',
          images: [
            { url: '' },
            { url: '' }
          ]
        }
      ]
    },
    {
      slug: 'candid-aesthetic',
      title: 'Analog Revival',
      author: 'Photography Dept',
      category: 'Art',
      summary: 'Why we are returning to cinematic candid photography this semester.',
      date: 'Jan 30, 2026'
    }, 
    {
      slug: 'covet',
      title: 'Covet',
      author: 'Joanna Virippil',
    category: 'Editorial',
    summary: 'An exploration of shared light, stolen identity, and the weight of adornment.',

    }
  ]

  return MOCK_DATA;
}