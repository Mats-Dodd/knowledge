import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const knowledgeItems = await prisma.knowledge.findMany();
    return NextResponse.json(knowledgeItems);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    return NextResponse.json({ error: 'Failed to fetch knowledge items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, tags } = body;
    
    const newKnowledge = await prisma.knowledge.create({
      data: {
        title,
        content,
        tags
      }
    });
    
    return NextResponse.json(newKnowledge, { status: 201 });
  } catch (error) {
    console.error('Error creating knowledge:', error);
    return NextResponse.json({ error: 'Failed to create knowledge item' }, { status: 500 });
  }
} 