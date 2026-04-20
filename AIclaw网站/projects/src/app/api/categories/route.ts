import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { categories } from '@/storage/database/shared/schema';

export async function GET() {
  const client = getSupabaseClient();
  
  const { data, error } = await client
    .from('categories')
    .select('*')
    .order('id');
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}
