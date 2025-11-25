import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { toInt } from '@/lib/utils';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const id = toInt(params.id);
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: 'asc' } }, category: true }
  });
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const id = toInt(params.id);
  const body = await request.json().catch(() => ({}));
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      priceInt: typeof body.priceInt === 'number' ? body.priceInt : undefined,
      stock: typeof body.stock === 'number' ? body.stock : undefined,
      published: typeof body.published === 'boolean' ? body.published : undefined
    }
  });
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const id = toInt(params.id);
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


