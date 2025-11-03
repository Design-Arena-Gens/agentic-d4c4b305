import { NextResponse } from 'next/server';
import { synthesizeAgents, type RequirementInput } from '@/lib/agents';

export async function POST(request: Request) {
  const body = (await request.json()) as RequirementInput;
  const agents = synthesizeAgents(body);
  return NextResponse.json({ agents });
}
