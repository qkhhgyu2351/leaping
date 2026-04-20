import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  
  const categorySlug = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort') || 'latest';
  const search = searchParams.get('search');
  
  let query = client
    .from('posts')
    .select(`
      *,
      profiles!author_id(username, display_name, avatar_url),
      categories!category_id(name, slug, icon, color)
    `, { count: 'exact' })
    .eq('is_deleted', false);
  
  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }
  
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }
  
  switch (sort) {
    case 'popular':
      query = query.order('like_count', { ascending: false });
      break;
    case 'hot':
      query = query.order('view_count', { ascending: false });
      break;
    default:
      query = query.order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
  }
  
  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);
  
  const { data, error, count } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ 
    data, 
    total: count || 0,
    page,
    limit 
  });
}

export async function POST(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const body = await request.json();
    const { title, content, category_id, author_id, summary, cover_image } = body;
    
    if (!title || !content || !category_id || !author_id) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
    }
    
    const { data, error } = await client
      .from('posts')
      .insert({ 
        title, 
        content, 
        category_id, 
        author_id,
        summary: summary || content.substring(0, 200),
        cover_image 
      })
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}
