import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function POST(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const body = await request.json();
    const { user_id, target_type, target_id } = body;
    
    if (!user_id || !target_type || !target_id) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
    }
    
    // 检查是否已点赞
    const { data: existing } = await client
      .from('likes')
      .select('id')
      .eq('user_id', user_id)
      .eq('target_type', target_type)
      .eq('target_id', target_id)
      .maybeSingle();
    
    if (existing) {
      // 取消点赞
      await client.from('likes').delete().eq('id', existing.id);
      
      // 更新计数
      const table = target_type === 'post' ? 'posts' : 'comments';
      const countField = target_type === 'post' ? 'like_count' : 'like_count';
      await client.rpc('decrement_like_count', { 
        table_name: table, 
        row_id: target_id,
        count_field: countField
      });
      
      return NextResponse.json({ liked: false });
    } else {
      // 添加点赞
      await client.from('likes').insert({ 
        user_id, 
        target_type, 
        target_id 
      });
      
      // 更新计数
      const table = target_type === 'post' ? 'posts' : 'comments';
      await client.rpc('increment_like_count', { 
        table_name: table, 
        row_id: target_id,
        count_field: target_type === 'post' ? 'like_count' : 'like_count'
      });
      
      return NextResponse.json({ liked: true });
    }
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  
  const user_id = searchParams.get('user_id');
  const target_type = searchParams.get('target_type');
  const target_id = searchParams.get('target_id');
  
  if (!user_id || !target_type || !target_id) {
    return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
  }
  
  const { data } = await client
    .from('likes')
    .select('id')
    .eq('user_id', user_id)
    .eq('target_type', target_type)
    .eq('target_id', target_id)
    .maybeSingle();
  
  return NextResponse.json({ liked: !!data });
}
