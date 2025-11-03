import { NextResponse } from 'next/server';
import { runPlanner, type RequirementInput } from '@/lib/agents';

export async function POST(request: Request) {
  const body = (await request.json()) as RequirementInput;
  const plan = runPlanner(body);
  return NextResponse.json({ plan });
}
