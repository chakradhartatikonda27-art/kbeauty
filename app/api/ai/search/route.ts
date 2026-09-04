import { NextResponse } from 'next/server';
import { aiSearch } from '@/lib/ai/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }

    const result = aiSearch(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI search' }, { status: 500 });
  }
}
