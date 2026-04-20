import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  
  const username = searchParams.get('username');
  
  if (!username) {
    return NextResponse.json({ error: '缺少用户名' }, { status: 400 });
  }
  
  const { data, error } = await client
    .from('profiles')
    .select(`
      *,
      posts(count)
    `)
    .eq('username', username)
    .single();
  
  if (error) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }
  
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const body = await request.json();
    const { id, username, display_name, avatar_url } = body;
    
    if (!id || !username) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
    }
    
    // upsert 用户资料
    const { data, error } = await client
      .from('profiles')
      .upsert({
        id,
        username,
        display_name: display_name || username,
        avatar_url,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      })
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
