import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const items = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const name = (body?.name as string | undefined)?.trim();
  if (!name) return NextResponse.json({ message: 'Name required' }, { status: 400 });
  const created = await prisma.category.upsert({
    where: { slug: slugify(name) },
    update: {},
    create: { name, slug: slugify(name) }
  });
  return NextResponse.json(created, { status: 201 });
}


