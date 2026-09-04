import { NextResponse } from 'next/server';
import { evaluateSkinQuiz } from '@/lib/ai/service';

export async function POST(request: Request) {
  try {
    const answers = await request.json();
    const result = evaluateSkinQuiz(answers);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to evaluate AI Skin Quiz' }, { status: 500 });
  }
}
