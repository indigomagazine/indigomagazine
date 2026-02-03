// src/lib/api.ts
export async function getDispatchContent(slug: string) {
  // Eventually: return supabase.from('posts').select('*').eq('slug', slug).single();
  
  const MOCK_DATA = [
    { slug: 'indigoos-review', 
        title: 'Best Coffee in Plano', 
        content: 'This is raw data being handled by the engine.', 
        author: 'Luis' }
  ];
  
  return MOCK_DATA.find(post => post.slug === slug);
}

export async function getAllArticlePosts() {
  // Eventually: return supabase.from('posts').select('*').order('date', { ascending: false });
  const MOCK_DATA = [
    {
      id: '1',
      slug: 'indigoos-review',
      title: 'The IndigoOS Vision',
      author: 'Luis Alarcon',
      category: 'Tech',
      summary: 'Exploring the new system architecture for our creative platform.',
      date: 'Jan 31, 2026'
    },
    {
      id: '2',
      slug: 'candid-aesthetic',
      title: 'Analog Revival',
      author: 'Photography Dept',
      category: 'Art',
      summary: 'Why we are returning to cinematic candid photography this semester.',
      date: 'Jan 30, 2026'
    }
  ]

  return MOCK_DATA;
}