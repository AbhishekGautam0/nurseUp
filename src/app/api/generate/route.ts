import { generateQuestions } from '@/ai/flows/generate-questions-flow';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, count } = await req.json();

    if (!topic || !count) {
      return NextResponse.json({ error: 'Missing topic or count' }, { status: 400 });
    }

    const result = await generateQuestions({ topic, count });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in generate API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to generate questions', details: errorMessage }, { status: 500 });
  }
}
