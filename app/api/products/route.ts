import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { toInt, slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ProductCreateSchema } from '@/lib/validators';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  const page = toInt(searchParams.get('page'), 1);
  const pageSize = toInt(searchParams.get('pageSize'), toInt(searchParams.get('limit'), 24));
  const categoryId = searchParams.get('categoryId');

  const where = {
    published: true,
    AND: [
      q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } }
            ]
          }
        : {},
      categoryId ? { categoryId: toInt(categoryId) } : {}
    ]
  };

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { images: { orderBy: { sortOrder: 'asc' }, select: { url: true, alt: true } } }
    })
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pageSize
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = ProductCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid body', issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;

  const productSlug = slugify(data.name);
  let categoryId: number | undefined = undefined;
  if (data.categoryName) {
    const categorySlug = slugify(data.categoryName);
    const cat = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: data.categoryName, slug: categorySlug }
    });
    categoryId = cat.id;
  }

  const created = await prisma.product.create({
    data: {
      name: data.name,
      slug: productSlug,
      description: data.description,
      priceInt: data.priceInt,
      currency: data.currency,
      stock: data.stock,
      sku: data.sku,
      categoryId,
      images: {
        create: data.images.map((url, idx) => ({ url, sortOrder: idx }))
      }
    }
  });

  return NextResponse.json(created, { status: 201 });
}


