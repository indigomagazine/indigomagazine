// src/lib/api.ts
export async function getDispatchContent(slug: string) {
  // Eventually: return supabase.from('posts').select('*').eq('slug', slug).single();
  
  const MOCK_DATA = [
    { slug: 'plano-coffee', 
        title: 'Best Coffee in Plano', 
        content: 'This is raw data being handled by the engine.', 
        author: 'Luis' }
  ];
  
  return MOCK_DATA.find(post => post.slug === slug);
}