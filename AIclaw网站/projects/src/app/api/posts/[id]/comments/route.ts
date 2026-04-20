import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;
  
  const { data, error } = await client
    .from('comments')
    .select(`
      *,
      profiles!author_id(username, display_name, avatar_url)
    `)
    .eq('post_id', id)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id: postId } = await params;
  
  try {
    const body = await request.json();
    const { content, author_id, parent_id } = body;
    
    if (!content || !author_id) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
    }
    
    // 插入评论
    const { data: comment, error: commentError } = await client
      .from('comments')
      .insert({ 
        post_id: postId,
        content, 
        author_id,
        parent_id: parent_id || null
      })
      .select(`
        *,
        profiles!author_id(username, display_name, avatar_url)
      `)
      .single();
    
    if (commentError) {
      return NextResponse.json({ error: commentError.message }, { status: 500 });
    }
    
    // 更新帖子评论数
    const { error: rpcError } = await client.rpc('increment_comment_count', { post_id: postId });
    if (rpcError) {
      console.error('Failed to increment comment count:', rpcError);
    }
    
    return NextResponse.json({ data: comment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}
