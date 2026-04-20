import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;
  
  const { data, error } = await client
    .from('posts')
    .select(`
      *,
      profiles!author_id(username, display_name, avatar_url, bio, is_verified),
      categories!category_id(name, slug, icon, color)
    `)
    .eq('id', id)
    .eq('is_deleted', false)
    .single();
  
  if (error) {
    return NextResponse.json({ error: '帖子不存在' }, { status: 404 });
  }
  
  // 增加浏览量
  await client
    .from('posts')
    .update({ view_count: data.view_count + 1 })
    .eq('id', id);
  
  return NextResponse.json({ data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;
  
  try {
    const body = await request.json();
    const { title, content, category_id, summary, cover_image } = body;
    
    const { data, error } = await client
      .from('posts')
      .update({ 
        title, 
        content, 
        category_id, 
        summary,
        cover_image,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;
  
  const { error } = await client
    .from('posts')
    .update({ is_deleted: true })
    .eq('id', id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}
