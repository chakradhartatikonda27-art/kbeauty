import { NextResponse } from 'next/server';
import { aiCheckCartRoutine } from '@/lib/ai/service';

export async function POST(request: Request) {
  try {
    const { products } = await request.json();
    const result = aiCheckCartRoutine(products || []);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process compatibility check' }, { status: 500 });
  }
}
